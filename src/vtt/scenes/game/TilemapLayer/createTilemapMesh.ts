import { MeshSimple, RenderTexture } from "pixi.js";
import { TMXMap } from "./TMXInterface";

export default function createTilemapMesh(map: TMXMap, texture: RenderTexture, uvMap: Map<number, Float32Array>) {
    const { width, height, tilewidth, tileheight } = map["@_"];
    const meshes: MeshSimple[] = [];
    const layers = Array.isArray(map.layer) ? map.layer : [map.layer];
    for (const layer of layers) {
        const numberOfTiles = width * height;
        const vertices = new Float32Array(numberOfTiles * 8);
        const uvs = new Float32Array(numberOfTiles * 8);
        const indices = new Uint32Array(numberOfTiles * 6);

        let vertexOffset = 0;
        let uvOffset = 0;
        let indexOffset = 0;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;

                const x0 = x * tilewidth;
                const y0 = y * tileheight;
                const x1 = x0 + tilewidth;
                const y1 = y0 + tileheight;
                vertices[vertexOffset++] = x0
                vertices[vertexOffset++] = y0
                vertices[vertexOffset++] = x1
                vertices[vertexOffset++] = y0
                vertices[vertexOffset++] = x1
                vertices[vertexOffset++] = y1
                vertices[vertexOffset++] = x0
                vertices[vertexOffset++] = y1

                const uv = uvMap.get(layer.data['#tiledata'][index].id);
                if (uv) {
                    uvs[uvOffset++] = uv[0];
                    uvs[uvOffset++] = uv[1];
                    uvs[uvOffset++] = uv[2];
                    uvs[uvOffset++] = uv[3];
                    uvs[uvOffset++] = uv[4];
                    uvs[uvOffset++] = uv[5];
                    uvs[uvOffset++] = uv[6];
                    uvs[uvOffset++] = uv[7];
                } else {
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                    uvs[uvOffset++] = 0;
                }

                const firstIndex = index * 4;
                indices[indexOffset++] = firstIndex;
                indices[indexOffset++] = firstIndex + 1;
                indices[indexOffset++] = firstIndex + 2;
                indices[indexOffset++] = firstIndex;
                indices[indexOffset++] = firstIndex + 2;
                indices[indexOffset++] = firstIndex + 3;
            }
        }
        meshes.push(new MeshSimple({ texture, vertices, uvs, indices }));
    }
    return meshes;
}