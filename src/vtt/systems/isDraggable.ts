import { Container, FederatedPointerEvent, PointData } from "pixi.js";

export default function isDraggable(container: Container) {
    let isDragging = false;
    let dragOffset: PointData | null = null;

    container.on("pointerdown", event => {
        isDragging = true;
        const pos = event.getLocalPosition(container.parent);
        dragOffset = { x: pos.x - container.x, y: pos.y - container.y };
    });

    container.on('pointerup', () => {
        isDragging = false;
        dragOffset = null;
    });

    container.on('pointerupoutside', () => {
        isDragging = false;
        dragOffset = null;
    });

    container.on('pointermove', (event: FederatedPointerEvent) => {
        if (isDragging && dragOffset) {
            const pos = event.getLocalPosition(container.parent);
            container.position.set(Math.floor(pos.x - dragOffset.x), Math.floor(pos.y - dragOffset.y));
        }
    });
}