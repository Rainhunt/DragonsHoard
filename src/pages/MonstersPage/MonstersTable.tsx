import { useCallback, useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import SearchableTable, { SearchableTableColumn } from "../../components/SearchableTable/SearchableTable";
import { ShortMonsterSchema } from "../../services/requests/monsters/getMonsters/responseValidator";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routerModel";

const columns: SearchableTableColumn<ShortMonsterSchema>[] = [{
    id: "name",
    label: "Name",
    cellValue: (monster) => monster.name,
    sortFunc: (a, b) => a.name.localeCompare(b.name)
}, {
    id: "alignment",
    label: "Alignment",
    cellValue: (monster) => monster.alignment,
    sortFunc: (a, b) => a.alignment.localeCompare(b.alignment)
}, {
    id: "biome",
    label: "Biome",
    cellValue: (monster) => monster.biome,
    sortFunc: (a, b) => a.biome.localeCompare(b.biome)
}, {
    id: "cr",
    label: "CR",
    cellValue: (monster) => {
        switch (monster.CR) {
            case 0.125:
                return "\u215b";
            case 0.25:
                return "\u00bc";
            case 0.5:
                return "\u00bd";
            default:
                return monster.CR;
        }
    },
    sortFunc: (a, b) => a.CR - b.CR
}, {
    id: "hp",
    label: "Hit Points",
    cellValue: (monster) => monster.hitPoints.max,
    sortFunc: (a, b) => a.hitPoints.max - b.hitPoints.max
}, {
    id: "size",
    label: "Size",
    cellValue: (monster) => monster.size,
    sortFunc: (a, b) => a.size.localeCompare(b.size)
}, {
    id: "type",
    label: "Type",
    cellValue: (monster) => monster.type,
    sortFunc: (a, b) => a.type.localeCompare(b.type)
}];

export default function MonstersTable() {
    const navigate = useNavigate();
    const [selectedColumns, setSelectedColumns] = useState<SearchableTableColumn<ShortMonsterSchema>[]>(columns);
    const toggleColumn = useCallback((id: string) => {
        setSelectedColumns(prev => {
            const index = prev.findIndex(column => column.id === id);
            if (index === -1) {
                return [...columns.filter(column => column.id === id || prev.find(prevColumn => prevColumn.id === column.id))];
            } else {
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            }
        })
    }, [columns]);
    const buttonsColumn = useMemo<SearchableTableColumn<ShortMonsterSchema>>(() => ({
        id: "buttons",
        label: <DropDown label={<div className="left-nav-hamburger">{"\u2630"}</div>} openOn="hover">
            {columns.map(column => <Button key={column.id} className="nav-button" onClick={() => toggleColumn(column.id)}>{column.label}</Button>)}
        </DropDown>,
        cellValue: (monster) => <>
            <Button text="View" onClick={() => navigate(`${ROUTES.MONSTER}/${monster._id}`)} />
        </>
    }), [columns, toggleColumn]);

    return (
        <SearchableTable<ShortMonsterSchema> columns={[...selectedColumns, buttonsColumn]}></SearchableTable>
    )
}