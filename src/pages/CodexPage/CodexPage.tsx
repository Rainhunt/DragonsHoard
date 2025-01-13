import './codex-page.scss';
import { useCallback, useEffect } from 'react';
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import Scroll from '../../components/Scroll/Scroll';
import { monstersSchema } from '../../services/responseValidators/monsters/getMonsters';
import Button from '../../components/Button/Button';
import BiomeFilter from './Filters/BiomeFilter/BiomeFilter';
import CreatureTypeFilter from './Filters/CreatureTypeFilter/CreatureTypeFilter';
import CrFilter from './Filters/CrFilter/CrFilter';
import SearchFilter from './Filters/SearchFilter/SearchFilter';
import SearchableDataProvider from '../../context/SearchableDataProvider';
import MonsterDisplay from './MonsterDisplay';

export default function CodexPage() {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    useEffect(() => {
        setPagePerms("all");
        setBackgroundImage("/monster-codex-placeholder.jpg");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
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
            <div className="codex-page">
                <h1 className="codex-header">Monster Codex</h1>
                <Scroll classNames={{ container: "codex-filters" }} width="100%">
                    <BiomeFilter />
                    <CreatureTypeFilter />
                    <CrFilter />
                    <div className="filters-column">
                        <SearchFilter />
                        <Button className="advanced-filter-button" text={`Advanced Filters \u00BB`} onClick={() => { }} />
                    </div>
                </Scroll>
                <MonsterDisplay />
            </div>
        </SearchableDataProvider>
    )
}
