import { Assets, Rectangle, Renderer, RenderTexture, Sprite, Texture } from "pixi.js";
import { z } from "zod";
import { tilesetSchema } from "./parseTMX";

export default async function createTileset(renderer: Renderer, textureSpacing: number, textureMargin: number, ...tilesets: z.infer<typeof tilesetSchema>[]) {
    const [width, height] = getTextureDimensions(textureSpacing, tilesets);
    const textureWidth = width + 2 * textureMargin;
    const textureHeight = height + 2 * textureMargin;

    const renderTexture = RenderTexture.create({ width: textureWidth, height: textureHeight, scaleMode: "nearest" });

    const uvMap = new Map<number, Float32Array>();
    let u = textureMargin;
    let v = textureMargin;
    for (const tileset of tilesets) {
        const image = await Assets.load(`${import.meta.env.BASE_URL}${tileset.image["@_"].source}`);
        const { firstgid, name, tilewidth, tileheight, spacing, margin, columns, tilecount } = tileset["@_"];
        if (tilewidth > width) throw new Error(`${name}'s tiles are too wide for the container`);
        for (let i = 0; i < tilecount; i++) {
            const rect = new Rectangle(margin + (i % columns) * (tilewidth + spacing), margin + Math.floor(i / columns) * (tileheight + spacing), tilewidth, tileheight);
            const texture = new Texture({ source: image.source, frame: rect });
            const sprite = new Sprite(texture);
            sprite.position.set(u, v);
            renderer.render({ container: sprite, target: renderTexture, clear: false });

            const uv = new Float32Array(8);
            const u0 = u / textureWidth;
            const v0 = v / textureHeight;
            const u1 = (u + tilewidth) / textureWidth;
            const v1 = (v + tileheight) / textureHeight;
            uv[0] = u0;
            uv[1] = v0;
            uv[2] = u1;
            uv[3] = v0;
            uv[4] = u1;
            uv[5] = v1;
            uv[6] = u0;
            uv[7] = v1;
            uvMap.set(firstgid + i, uv);
            u += tilewidth + textureSpacing;
            if (u + tilewidth + textureMargin > width || i + 1 === tilecount) {
                u = textureMargin;
                v += tileheight + textureSpacing;
            }

            sprite.destroy();
            texture.destroy(false);
        }
    }
    return { renderTexture, uvMap };
}

function getTextureDimensions(spacing: number, tilesets: z.infer<typeof tilesetSchema>[]) {
    let area = 0;
    for (const tileset of tilesets) {
        area += tileset["@_"].tilecount * (tileset["@_"].tilewidth + spacing) * (tileset["@_"].tileheight + spacing);
    }
    const width = Math.ceil(Math.sqrt(area)) - spacing;
    let height = 0;
    for (const tileset of tilesets) {
        const tilesPerRow = Math.floor(width / (tileset["@_"].tilewidth + spacing));
        height += Math.ceil(tileset["@_"].tilecount / tilesPerRow) * (tileset["@_"].tileheight + spacing) - spacing;
    }
    return [width, height];
}