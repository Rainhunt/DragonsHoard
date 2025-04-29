import './game-table-page.scss';
import { useEffect, useRef } from "react";
import { useLayout } from "../../layout/Layout"
import usePixi from '../../hooks/usePixi';
import { TestTable } from '../../vtt/engine/TableTop';

export default function GameTablePage() {
    const node = useRef<HTMLDivElement>(null);
    usePixi(node, TestTable, { background: "violet" });

    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.noHeader = true;
        page.offsetTop = 0;
        page.margins = 0;
    }, []);
    return (
        <div ref={node} className="pixi-surface" />
    )
}