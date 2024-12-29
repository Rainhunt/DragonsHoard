import React, { useCallback, useEffect, useState } from 'react'
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import Scroll from '../../components/Scroll/Scroll';
import './codex-page.scss';
import HeaderSortScroll from '../../components/Scroll/HeaderSortScroll/HeaderSortScroll';
import { Monster, monstersSchema } from '../../services/responseValidators/getMonster';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routerModel';
import BiomeFilter from './Filters/BiomeFilter/BiomeFilter';
import CreatureTypeFilter from './Filters/CreatureTypeFilter/CreatureTypeFilter';
import CrFilter from './Filters/CrFilter.tsx/CrFilter';
import SearchFilter from './Filters/SearchFilter.tsx/SearchFilter';

const CodexPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./monster-codex-placeholder.jpg");
        }
        if (setMainMarginPx) {
            setMainMarginPx(300);
        }
        const getMonsters = async () => {
            try {
                const response = await new Request("monsters").get();
                const validatedMonsters = monstersSchema.parse(response);
                setMonsters(validatedMonsters);
            } catch (err) {
                console.log(`Error fetching monsters: ${err}`);
            }
        }
        getMonsters();
    }, []);

    //monster data
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [filterParameters, setFilterParameters] = useState<Record<string, (monsters: Monster[]) => Monster[]>>({});
    const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);
    const useFilters = useCallback(() => {
        let monstersToBeFiltered = monsters;
        for (const key in filterParameters) {
            monstersToBeFiltered = filterParameters[key](monstersToBeFiltered);
        }
        setFilteredMonsters(monstersToBeFiltered);
    }, [monsters, filterParameters]);
    useEffect(() => {
        useFilters();
    }, [monsters, filterParameters]);

    //display data
    const [selectedColumns, setSelectedColumns] = useState([{ label: "CR", id: "CR" }, { label: "Name", id: "name" }, { label: "Type", id: "type" }, { label: "Environment", id: "biome" }, { label: "hamburger", id: "view", noSort: true }]);
    const [unselectedColumns, setUnselectedColumns] = useState(["Humanoid", "Beast", "Ooze"]);

    return (
        <>
            <h1>Monster Codex</h1>
            <Scroll className="filters" width={"100%"}>
                <BiomeFilter setFilterParameters={setFilterParameters} unfilteredMonsters={monsters} />
                <CreatureTypeFilter setFilterParameters={setFilterParameters} unfilteredMonsters={monsters} />
                <CrFilter setFilterParameters={setFilterParameters} />
                <div className="filters-column">
                    <SearchFilter setFilterParameters={setFilterParameters} />
                    <Button className="advanced-filter-button" text={`Advanced Filters \u00BB`} onClick={() => { }} />
                </div>
            </Scroll>
            <HeaderSortScroll<Monster> className="display-scroll" headers={selectedColumns} data={filteredMonsters.map(monster => {
                monster.view = <Button className="view-more-button" text="View More" onClick={() => navigate(ROUTES.MONSTER_STATBLOCK + `/${monster._id}`)} />;
                return monster
            })} setData={setMonsters} />
        </>
    )
}

export default CodexPage;