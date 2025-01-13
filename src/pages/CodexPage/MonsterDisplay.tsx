import styles from '../../styles/index.module.scss';
import React, { useEffect, useState } from 'react';
import { Monster } from '../../services/responseValidators/monsters/getMonsters';
import HeaderSortScroll from '../../components/Scroll/HeaderSortScroll/HeaderSortScroll';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routerModel';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import useBreakpoint from '../../hooks/useBreakpoints';
import { useLayout } from '../../context/LayoutProvider';

const MonsterDisplay: React.FC = () => {
    const navigate = useNavigate();
    const breakpoints = useBreakpoint();
    const { createSnack } = useLayout();

    const columns = [
        { label: "CR", id: "CR" },
        { label: "Name", id: "name" },
        { label: "Size", id: "size" },
        { label: "Type", id: "type" },
        { label: "Hitpoints", id: "hitPoints" },
        { label: "Alignment", id: "alignment" },
        { label: "Environment", id: "biome" },
    ];
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    useEffect(() => {
        switch (breakpoints) {
            case "desktop":
                setSelectedColumns(["CR", "name", "type", "biome"]);
                break;
            case "tablet":
                setSelectedColumns(["CR", "name", "biome"]);
                break;
            default:
                setSelectedColumns(["CR", "name"]);
        }
    }, [breakpoints]);

    return (
        <HeaderSortScroll<Monster> className="display-scroll" headers={[...columns.filter(column => selectedColumns.includes(column.id)), {
            label: <DropDownMenu label={"\u2630"}
                items={[columns.map(column => (
                    <Button key={column.id} className={selectedColumns.includes(column.id) ? "selected" : "unselected"} text={column.label} onClick={() => {
                        const isSelected = selectedColumns.includes(column.id);
                        if (isSelected) {
                            setSelectedColumns(prev => [...prev.filter(id => id !== column.id)]);
                        } else {
                            let maxColumns = 7;
                            switch (breakpoints) {
                                case "tablet":
                                    maxColumns = 4;
                                    break;
                                case "phone":
                                    maxColumns = 2;
                            }
                            if (selectedColumns.length < maxColumns) {
                                setSelectedColumns(prev => [...prev, column.id]);
                            } else {
                                createSnack({ id: Date.now(), time: 10, right: "10%", top: "10%", style: { backgroundColor: styles.textLabel, color: styles.textButtons, fontSize: "1.5rem" }, children: "Screen too narrow" });
                            }
                        }
                    }} />
                ))]}
                right
            />,
            id: "view",
            noSort: true
        }]} errors={{ isEmpty: "No Monsters Match Your Search..." }} mutateDisplay={(filteredMonsters) => {
            return filteredMonsters.map(monster => {
                monster.view = <Button className="view-more-button" text="View More" onClick={() => navigate(ROUTES.MONSTER_STATBLOCK + `/${monster._id}`)} />;
                return monster
            });
        }} />
    )
}

export default MonsterDisplay;