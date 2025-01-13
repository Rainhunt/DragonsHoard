import '../CodexPage/codex-page.scss';
import { useCallback, useEffect } from 'react';
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import Scroll from '../../components/Scroll/Scroll';
import { monstersSchema } from '../../services/responseValidators/monsters/getMonsters';
import Button from '../../components/Button/Button';
import SearchableDataProvider from '../../context/SearchableDataProvider';
import BiomeFilter from '../CodexPage/Filters/BiomeFilter/BiomeFilter';
import CreatureTypeFilter from '../CodexPage/Filters/CreatureTypeFilter/CreatureTypeFilter';
import SearchFilter from '../CodexPage/Filters/SearchFilter/SearchFilter';
import CrFilter from '../CodexPage/Filters/CrFilter/CrFilter';
import MonsterDisplay from '../CodexPage/MonsterDisplay';
import { useUser } from '../../context/UserProvider';

export default function MyMonstersPage() {
    const { jwt } = useUser();
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    useEffect(() => {
        setPagePerms("user");
        setBackgroundImage("/monster-codex-placeholder.jpg");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
    }, []);

    const getMyMonsters = useCallback(async () => {
        try {
            if (jwt) {
                const request = new Request("monsters/my-creations");
                request.Headers = { ["x-auth-token"]: jwt }
                const response = await request.get();
                const validatedMonsters = monstersSchema.parse(response);
                return validatedMonsters;
            }
        } catch (err) {
            console.log(`Error fetching monsters: ${err}`);
        }
    }, [jwt]);

    return (
        <SearchableDataProvider fetch={getMyMonsters}>
            <div className="codex-page">
                <h1 className="codex-header">My Monsters</h1>
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
