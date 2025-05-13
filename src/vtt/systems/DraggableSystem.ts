import { Application, Container, FederatedPointerEvent, PointData } from "pixi.js";

export interface DraggableOptions {
    bubble?: boolean;
    snapTo?(position: PointData): PointData;
}

export default class DraggableSystem {
    private static app: Application;
    private static draggables = new WeakMap<Container, Draggable>();

    static init(app: Application) {
        this.app = app;
    }

    static add(container: Container, options?: DraggableOptions) {
        if (!this.app) throw new Error("DraggableSystem must be initialized before being called");
        this.draggables.set(container, new Draggable(this.app, container, options));
    }

    static remove(container: Container) {
        const draggable = this.draggables.get(container);
        if (draggable) {
            draggable.destroy();
            this.draggables.delete(container);
        }
    }
}

export class Draggable {
    private stage: Container;
    private container: Container;
    private offset?: PointData;
    private options?: DraggableOptions;

    constructor(app: Application, container: Container, options?: DraggableOptions) {
        this.stage = app.stage;
        this.container = container;
        this.options = options;

        container.on("pointerdown", this.onPointerDown);
        this.stage.on("pointermove", this.onPointerMove);
        this.stage.on("pointerup", this.onPointerUp);
        this.stage.on("pointerupoutside", this.onPointerUp);
    }

    private onPointerDown = (e: FederatedPointerEvent) => {
        const position = e.getLocalPosition(this.container.parent);
        this.offset = { x: position.x - this.container.x, y: position.y - this.container.y };
        if (this.options?.bubble === false) e.stopPropagation();
    }

    private onPointerMove = (e: FederatedPointerEvent) => {
        if (!this.offset) return;
        const position = e.getLocalPosition(this.container.parent);
        let newPosition = { x: Math.floor(position.x - this.offset.x), y: Math.floor(position.y - this.offset.y) };
        if (this.options?.snapTo) newPosition = this.options.snapTo(newPosition);

        this.container.position.copyFrom(newPosition);
    }

    private onPointerUp = (e: FederatedPointerEvent) => {
        this.offset = undefined;
        if (this.options?.bubble === false) e.stopPropagation();
    }

    destroy() {
        this.container.off("pointerdown", this.onPointerDown);
        this.stage.off("pointermove", this.onPointerMove);
        this.stage.off("pointerup", this.onPointerUp);
        this.stage.off("pointerupoutside", this.onPointerUp);
    }
}