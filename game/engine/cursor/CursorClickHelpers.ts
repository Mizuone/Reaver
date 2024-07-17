export interface CanvasClickCoordinates {
    x: number;
    y: number;
}

export const DebugClickCursorCoordinates = (canvas: Element, event: MouseEvent) => {    
    const {x, y} = GetXYClickLocation(canvas, event);

    console.log({x: x, y: y});
}

export const GetXYClickLocation = (canvas: Element, event: MouseEvent): CanvasClickCoordinates => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    const x: number = Math.ceil(event.x - rect.left);
    const y: number = Math.ceil(event.y - rect.top);

    return {x, y};
};