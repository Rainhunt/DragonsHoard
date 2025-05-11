import { X2jOptions, XMLParser } from "fast-xml-parser";
import { inflate, ungzip } from "pako";
import { TMXMap, TMXTileset } from "./TMXInterface";

export interface TileData {
    id: number;
    hFlip: boolean;
    vFlip: boolean;
}

const options: X2jOptions = {
    ignoreDeclaration: true,
    ignoreAttributes: false,
    parseAttributeValue: true,
    attributesGroupName: "@_",
    attributeNamePrefix: ""
}

export default async function decodeTMX(url: string) {
    const tmx = await (await fetch(url)).text();
    const { map } = new XMLParser(options).parse(tmx) as { map: TMXMap };

    if (Array.isArray(map.tileset)) {
        for await (const [index, value] of map.tileset.entries()) {
            if (value["@_"].source) {
                const tsx = await (await fetch(`/${value["@_"].source}`)).text();
                const { tileset } = new XMLParser(options).parse(tsx) as { tileset: TMXTileset };
                tileset["@_"].firstgid = map.tileset[index]["@_"].firstgid;
                map.tileset[index] = tileset;
            }
        }
    } else {
        if (map.tileset["@_"].source) {
            const tsx = await (await fetch(`/${map.tileset["@_"].source}`)).text();
            const { tileset } = new XMLParser(options).parse(tsx) as { tileset: TMXTileset };
            tileset["@_"].firstgid = map.tileset["@_"].firstgid;
            map.tileset = tileset;
        }
    }

    if (Array.isArray(map.layer)) {
        for (const layer of map.layer) {
            layer.data["#tiledata"] = extractGids(layer.data["#text"], layer.data["@_"].compression);
        }
    } else {
        map.layer.data["#tiledata"] = extractGids(map.layer.data["#text"], map.layer.data["@_"].compression);
    }
    return map;
}

function extractGids(base64: string, compression: "gzip" | "zlib" | "zstd" | null) {
    const binaryStr = atob(base64);
    let byteArr = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        byteArr[i] = binaryStr.charCodeAt(i);
    }

    switch (compression) {
        case null:
            break;
        case "gzip":
            byteArr = inflate(byteArr);
            break;
        case "zlib":
            byteArr = ungzip(byteArr);
            break;
        default:
            throw new Error(`${compression} compression is not yet supported.`);
    }

    const dataView = new DataView(byteArr.buffer);
    const tiles: TileData[] = [];
    for (let i = 0; i < byteArr.length; i += 4) {
        const val = dataView.getUint32(i, true);
        tiles.push({
            id: val & 0x0FFFFFFF,
            hFlip: (val & 0x80000000) !== 0,
            vFlip: (val & 0x40000000) !== 0
        });
    }
    return tiles;
}