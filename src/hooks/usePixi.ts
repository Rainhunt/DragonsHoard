import { ApplicationOptions } from "pixi.js";
import { RefObject, useEffect } from "react";
import TableTop from "../vtt/engine/TableTop";

export default function usePixi(ref: RefObject<HTMLElement>, TableTop: (new () => TableTop), options?: Partial<ApplicationOptions>) {
    useEffect(() => {
        const node = ref.current;
        if (node) {
            const app = new TableTop().init(node, options);
            return () => { (async () => (await app).destroy())() };
        }
    }, []);
}