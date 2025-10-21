import { z, ZodIssueCode, ZodTypeAny } from "zod";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { extractGids } from "./extractGids";

function valueOrArray<T extends ZodTypeAny>(value: T) {
    return z.union([
        value,
        z.array(value)
    ]);
}

const options: X2jOptions = {
    ignoreDeclaration: true,
    ignoreAttributes: false,
    parseAttributeValue: true,
    attributesGroupName: "@_",
    attributeNamePrefix: ""
}

const imageSchema = z.object({
    "@_": z.object({
        source: z.string()
    })
});

export const tilesetSchema = z.object({
    "@_": z.object({
        firstgid: z.number(),
        name: z.string(),
        tilewidth: z.number().min(1),
        tileheight: z.number().min(1),
        spacing: z.number(),
        margin: z.number(),
        tilecount: z.number().min(1),
        columns: z.number().min(1),
    }),
    image: imageSchema
});

const dataSchema = z.object({
    "@_": z.object({
        encoding: z.enum(["base64"]),
        compression: z.enum(["gzip", "zlib"])
    }),
    "#text": z.string()
}).transform(input => ({
    ...input,
    "#tiledata": extractGids(input["#text"], input["@_"].compression)
}));

const layerSchema = z.object({
    "@_": z.object({
        id: z.number(),
        opacity: z.number().optional(),
        visible: z.string().optional(),
        tintcolor: z.string().optional(),
    }),
    data: dataSchema
});

export const mapSchema = z.preprocess(tmx => new XMLParser(options).parse(tmx).map, z.object({
    "@_": z.object({
        compressionlevel: z.number().optional(),
        width: z.number().min(1),
        height: z.number().min(1),
        tilewidth: z.number().min(1),
        tileheight: z.number().min(1),
        backgroundcolor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/, "backgroundcolor must be a hexidecimal value").optional()
    }),
    tileset: valueOrArray(z.object({ "@_": z.object({ source: z.string().optional(), firstgid: z.number() }) }).transform(async (input, ctx) => {
        if (input["@_"].source) {
            try {
                const response = await (await fetch(`/${input["@_"].source}`)).text();
                const tsx = new XMLParser(options).parse(response).tileset;
                const tileset = { ...tsx, "@_": { ...tsx["@_"], firstgid: input["@_"].firstgid } };
                return tilesetSchema.parse(tileset);
            } catch (err) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: `Error loading external tileset: ${err}`
                });
                return z.NEVER;
            }
        } else {
            return tilesetSchema.parse(input);
        }
    })),
    layer: valueOrArray(layerSchema)
}));

export default async function parseTMX(url: string) {
    const tmx = await (await fetch(url)).text();
    return mapSchema.parseAsync(tmx);
}