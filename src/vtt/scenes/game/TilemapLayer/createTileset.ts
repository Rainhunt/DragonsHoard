import { Assets, Graphics, Rectangle, Renderer, RenderTexture, Sprite, Texture } from "pixi.js";
import { TMXTileset } from "./TMXInterface";

export type UVQuad = [number, number, number, number, number, number, number, number];

export default async function createTileset(renderer: Renderer, textureSpacing: number, textureMargin: number, ...tilesets: TMXTileset[]) {
    const [width, height] = getTextureDimensions(textureSpacing, tilesets);
    const textureWidth = width + 2 * textureMargin;
    const textureHeight = height + 2 * textureMargin;

    const renderTexture = RenderTexture.create({ width: textureWidth, height: textureHeight, scaleMode: "nearest" });
    renderer.render({ target: renderTexture, container: new Graphics().rect(0, 0, textureWidth, textureHeight).fill("green") })

    const uvMap = new Map<number, UVQuad>();
    let u = textureMargin;
    let v = textureMargin;
    for (const tileset of tilesets) {
        const image = await Assets.load(`http://localhost:5173/${tileset.image["@_"].source}`);
        const { firstgid, name, tilewidth, tileheight, spacing, margin, columns, tilecount } = tileset["@_"];
        if (tilewidth > width) throw new Error(`${name}'s tiles are too wide for the container`);
        for (let i = 0; i < tilecount; i++) {
            const rect = new Rectangle(margin + (i % columns) * (tilewidth + spacing), margin + Math.floor(i / columns) * (tileheight + spacing), tilewidth, tileheight);
            const texture = new Texture({ source: image.source, frame: rect });
            const sprite = new Sprite(texture);
            sprite.position.set(u, v);
            renderer.render({ container: sprite, target: renderTexture, clear: false });

            uvMap.set(firstgid + i, [u / textureWidth, v / textureHeight, (u + tilewidth) / textureWidth, v / textureHeight, (u + tilewidth) / textureWidth, (v + tileheight) / textureHeight, u / textureWidth, (v + tileheight) / textureHeight]);
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

function getTextureDimensions(spacing: number, tilesets: TMXTileset[]) {
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