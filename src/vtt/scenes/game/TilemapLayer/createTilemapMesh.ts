import { MeshSimple, RenderTexture } from "pixi.js";
import { TMXMap } from "./TMXInterface";
import { UVQuad } from "./createTileset";

export default function createTilemapMesh(map: TMXMap, texture: RenderTexture, uvMap: Map<number, UVQuad>) {
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const { width, height, tilewidth, tileheight } = map["@_"];

    const layer = Array.isArray(map.layer) ? map.layer[0] : map.layer;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const x0 = x * tilewidth;
            const y0 = y * tileheight;
            const x1 = x0 + tilewidth;
            const y1 = y0 + tileheight;
            vertices.push(x0, y0, x1, y0, x1, y1, x0, y1);

            const uv = uvMap.get(layer.data['#tiledata'][y * width + x].id) || [0, 0, 0, 0, 0, 0, 0, 0];
            uvs.push(...uv);

            const firstIndex = (y * width + x) * 4;
            indices.push(firstIndex, firstIndex + 1, firstIndex + 2, firstIndex, firstIndex + 2, firstIndex + 3);
        }
    }

    const mesh = new MeshSimple({ texture, vertices: new Float32Array(vertices), uvs: new Float32Array(uvs), indices: new Uint32Array(indices) })
    return mesh;
}