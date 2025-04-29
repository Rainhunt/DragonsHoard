import { Application, ApplicationOptions, Assets, Container, Sprite } from "pixi.js";

export default abstract class TableTop {
    protected app = new Application();

    async init(node: HTMLElement, options?: Partial<ApplicationOptions>) {
        await this.app.init({ resizeTo: node, ...options });
        node.appendChild(this.app.canvas);
        await this.setup();
        return this;
    }

    abstract setup(): Promise<void>;

    destroy() {
        this.app.destroy(true);
    }
}

export class TestTable extends TableTop {
    private fpsCounter?: ReturnType<typeof setInterval>;

    async setup() {
        const container = new Container();

        this.app.stage.addChild(container);

        // Load the bunny texture
        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

        for (let i = 0; i < 100; i++) {
            const bunny = new Sprite(texture);

            bunny.x = (i % 10) * 40;
            bunny.y = Math.floor(i / 10) * 40;
            container.addChild(bunny);
        }

        // Move the container to the center
        container.x = this.app.screen.width / 2;
        container.y = this.app.screen.height / 2;

        // Center the bunny sprites in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        // Listen for animate update
        this.app.ticker.add((time) => {
            // Continuously rotate the container!
            // * use delta to create frame-independent transform *
            container.rotation += 0.02 * time.deltaTime;
        });

        this.fpsCounter = setInterval(() => {
            console.log(`FPS: ${this.app.ticker?.FPS.toFixed(2)}`);
        }, 1000);
    }

    destroy(): void {
        super.destroy();
        clearInterval(this.fpsCounter);
    }
}