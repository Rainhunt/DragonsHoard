import './index.scss';
import { Application, Graphics, Rectangle } from 'pixi.js';
import TilemapLayer from './scenes/game/TilemapLayer/TilemapLayer';
import DraggableSystem from './systems/DraggableSystem';

const gameConfig = {
    backgroundColor: "pink"
};

(async () => {
    const app = new Application();
    await app.init({ backgroundColor: gameConfig.backgroundColor, resizeTo: window, canvas: document.getElementById('root') as HTMLCanvasElement });
    app.stage.eventMode = "static";
    app.stage.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);
    DraggableSystem.init(app);

    const tilemapLayer = new TilemapLayer(app, "/desert.tmx");
    tilemapLayer.init();
    tilemapLayer.appendTo(app.stage);
})();