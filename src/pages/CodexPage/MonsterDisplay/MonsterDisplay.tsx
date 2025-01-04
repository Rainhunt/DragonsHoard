import './monster-display.scss'
import React, { useState } from 'react'
import { Monster } from '../../../services/responseValidators/getMonster'
import HeaderSortScroll from '../../../components/Scroll/HeaderSortScroll/HeaderSortScroll'
import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routerModel'
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu'

const MonsterDisplay: React.FC = () => {
    const navigate = useNavigate();

    //display data
    const sortedSet = ["cr", "name", "size", "type", "hitpoints", "alignment", "biome"];
    const [selectedColumns, setSelectedColumns] = useState([{ label: "CR", id: "CR" }, { label: "Name", id: "name" }, { label: "Type", id: "type" }, { label: "Environment", id: "biome" }, { label: <DropDownMenu label={"\u2630"} items={[<li>Item 1</li>, <li>Item 2</li>]} right />, id: "view", noSort: true }]);
    const [unselectedColumns, setUnselectedColumns] = useState(["Humanoid", "Beast", "Ooze"]);

    return (
        <HeaderSortScroll<Monster> className="display-scroll" headers={selectedColumns} errors={{ isEmpty: "No Monsters Match Your Search..." }} mutateDisplay={(filteredMonsters) => {
            return filteredMonsters.map(monster => {
                monster.view = <Button className="view-more-button" text="View More" onClick={() => navigate(ROUTES.MONSTER_STATBLOCK + `/${monster._id}`)} />;
                return monster
            });
        }} />
    )
}

export default MonsterDisplay;