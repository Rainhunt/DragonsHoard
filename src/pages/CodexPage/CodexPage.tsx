import './codex-page.scss'
import React, { useCallback, useEffect } from 'react'
import { useLayout } from '../../context/LayoutProvider'
import { Request } from '../../services/requests'
import Scroll from '../../components/Scroll/Scroll'
import { monstersSchema } from '../../services/responseValidators/getMonsters'
import Button from '../../components/Button/Button'
import BiomeFilter from './Filters/BiomeFilter/BiomeFilter'
import CreatureTypeFilter from './Filters/CreatureTypeFilter/CreatureTypeFilter'
import CrFilter from './Filters/CrFilter.tsx/CrFilter'
import SearchFilter from './Filters/SearchFilter.tsx/SearchFilter'
import SearchableDataProvider from '../../context/SearchableDataProvider'
import MonsterDisplay from './MonsterDisplay/MonsterDisplay'

const CodexPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();

    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./monster-codex-placeholder.jpg");
        }
        if (setMainMarginPx) {
            setMainMarginPx(300);
        }
    }, []);

    const getMonsters = useCallback(async () => {
        try {
            const response = await new Request("monsters").get();
            const validatedMonsters = monstersSchema.parse(response);
            return validatedMonsters;
        } catch (err) {
            console.log(`Error fetching monsters: ${err}`);
        }
    }, []);

    return (
        <SearchableDataProvider fetch={getMonsters}>
            <h1 className="codex-header">Monster Codex</h1>
            <Scroll className="filters" width={"100%"}>
                <BiomeFilter />
                <CreatureTypeFilter />
                <CrFilter />
                <div className="filters-column">
                    <SearchFilter />
                    <Button className="advanced-filter-button" text={`Advanced Filters \u00BB`} onClick={() => { }} />
                </div>
            </Scroll>
            <MonsterDisplay />
        </SearchableDataProvider>
    )
}

export default CodexPage;