import { Application, RenderTexture } from "pixi.js";
import Layer from "../../../components/Layer";
import { TMXMap } from "./TMXInterface";
import createTileset from "./createTileset";
import decodeTMX from "./decodeTMX";
import createTilemapMesh from "./createTilemapMesh";
import DraggableSystem from "../../../systems/DraggableSystem";

interface TilemapLayerState {
    app: Application;
    url: string;
}

interface TilemapLayerAssets {
    map?: TMXMap;
    tilset?: RenderTexture;
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
        const map = await decodeTMX(this.state.url);
        const tileset = Array.isArray(map.tileset) ? map.tileset : [map.tileset];
        const { renderTexture, uvMap } = await createTileset(this.state.app.renderer, 2, 2, ...tileset);
        this.assets = {
            map,
            tilset: renderTexture,
            uvMap
        }
    }

    protected setup() {
        if (this.assets.map && this.assets.tilset && this.assets.uvMap) {
            this.container.eventMode = "static";
            DraggableSystem.add(this.container);

            const meshes = createTilemapMesh(this.assets.map, this.assets.tilset, this.assets.uvMap);
            for (const mesh of meshes) {
                this.container.addChild(mesh);
            }
        } else {
            throw new Error(`TilemapLayer Assets not loaded.`);
        }
    }

    protected failedToInit(err: unknown): void {
        throw new Error("Method not implemented.");
    }
}