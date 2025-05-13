import { Container } from "pixi.js";
import retryWithBackoff from "../../utils/retryWithBackoff";

export default abstract class Layer {
    protected container = new Container();

    appendTo(parent: Container) {
        parent.addChild(this.container);
    }

    protected abstract getAssets(): Promise<void>;
    async init() {
        try {
            await retryWithBackoff(this.getAssets.bind(this));
            this.setup();
        } catch (err) {
            this.failedToInit(err);
        }
    }
    protected abstract setup(): void;
    protected abstract failedToInit(err: unknown): void;

    protected update?(): void;
}