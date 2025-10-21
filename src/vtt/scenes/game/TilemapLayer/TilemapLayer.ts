import { Application, RenderTexture } from "pixi.js";
import Layer from "../../../components/Layer";
import createTileset from "./createTileset";
import createTilemapMesh from "./createTilemapMesh";
import DraggableSystem from "../../../systems/DraggableSystem";
import parseTMX, { mapSchema } from "./parseTMX";
import { z } from "zod";

interface TilemapLayerState {
    app: Application;
    url: string;
}

interface TilemapLayerAssets {
    map?: z.infer<typeof mapSchema>;
    tileset?: RenderTexture;
    uvMap?: Map<number, Float32Array>;
}

export default class TilemapLayer extends Layer {
    state: TilemapLayerState
    protected assets: TilemapLayerAssets = {};

    constructor(app: Application, tmxUrl: string) {
        super();
        this.state = {
            app,
            url: tmxUrl
        }
    }

    protected async getAssets() {
        const map = await parseTMX(this.state.url);
        const tileset = Array.isArray(map.tileset) ? map.tileset : [map.tileset];
        const { renderTexture, uvMap } = await createTileset(this.state.app.renderer, 2, 2, ...tileset);
        this.assets = {
            map,
            tileset: renderTexture,
            uvMap
        }
    }

    protected setup() {
        if (this.assets.map && this.assets.tileset && this.assets.uvMap) {
            this.container.eventMode = "static";
            DraggableSystem.add(this.container);

            const meshes = createTilemapMesh(this.assets.map, this.assets.tileset, this.assets.uvMap);
            for (const mesh of meshes) {
                this.container.addChild(mesh);
            }
        } else {
            throw new Error(`TilemapLayer Assets not loaded.`);
        }
    }

    protected failedToInit(err: unknown): void {
        console.log(err);
    }
}