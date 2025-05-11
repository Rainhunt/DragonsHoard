import './index.scss';
import { Application } from 'pixi.js';
import decodeTMX from './scenes/game/TilemapLayer/decodeTMX';
import createTileset from './scenes/game/TilemapLayer/createTileset';
import createTilemapMesh from './scenes/game/TilemapLayer/createTilemapMesh';

(async () => {
    const app = new Application();
    await app.init({ backgroundAlpha: 0, resizeTo: window, canvas: document.getElementById('root') as HTMLCanvasElement });

    const map = await decodeTMX("/desert.tmx");
    const tileset = Array.isArray(map.tileset) ? map.tileset : [map.tileset];
    const { renderTexture, uvMap } = await createTileset(app.renderer, 2, 2, ...tileset);

    const layer = createTilemapMesh(map, renderTexture, uvMap);
    app.stage.addChild(layer)
})();