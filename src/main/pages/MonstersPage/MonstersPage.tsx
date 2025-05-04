import './monsters-page.scss';
import { useEffect, useState } from "react";
import Scroll from "../../components/Scroll/Scroll";
import SearchableDataProvider from "../../context/SearchableDataProvider";
import { useLayout } from "../../layout/Layout";
import getMonsters from "../../services/requests/monsters/getMonsters/getMonsters";
import MonstersTable from "./MonstersTable";
import SearchFilter from "./Filters/SearchFilter";
import DropDownFilter from './Filters/DropDownFilter';
import { ShortMonsterSchema } from '../../services/requests/monsters/getMonsters/responseValidator';
import CrFilter from './Filters/CrFilter';
import Button from '../../components/Button/Button';

export default function MonstersPage() {
    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.alignPageContent = "center";
        page.backgroundImage = "url(/background-placeholder.png)";
    }, []);
    const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

    return (
        <SearchableDataProvider fetch={async () => await getMonsters()}>
            <h1>Monsters</h1>
            <Scroll className="monster-filters-container" width="100%" backgroundColor="#E7D6A2E0">
                <div className="monster-filters">
                    <DropDownFilter<ShortMonsterSchema> id="biome" label="Environment" />
                    <DropDownFilter<ShortMonsterSchema> id="size" label="Size" />
                    <CrFilter />
                    <div className="column-container">
                        <SearchFilter />
                        <Button className="advanced-filters-button" text="Advanced Filters" onClick={() => setIsAdvancedFiltersOpen(prev => !prev)} />
                    </div>
                    {isAdvancedFiltersOpen && <>
                        <DropDownFilter<ShortMonsterSchema> id="alignment" label="Alignment" />
                        <DropDownFilter<ShortMonsterSchema> id="size" label="Size" />
                    </>}
                </div>
            </Scroll>
            <Scroll backgroundColor="#F1E5D1E0">
                <MonstersTable />
            </Scroll>
        </SearchableDataProvider>
    )
}