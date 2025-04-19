import './monsters-page.scss';
import { useEffect } from "react";
import Scroll from "../../components/Scroll/Scroll";
import SearchableDataProvider from "../../context/SearchableDataProvider";
import { useLayout } from "../../layout/Layout";
import getMonsters from "../../services/requests/monsters/getMonsters/getMonsters";
import MonstersTable from "./MonstersTable";
import SearchFilter from "./Filters/SearchFilter";
import DropDownFilter from './Filters/DropDownFilter';
import { ShortMonsterSchema } from '../../services/requests/monsters/getMonsters/responseValidator';
import CrFilter from './Filters/CrFilter';

export default function MonstersPage() {
    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.alignPageContent = "center";
        page.backgroundImage = "url(/background-placeholder.png)";
    }, []);

    return (
        <SearchableDataProvider fetch={async () => await getMonsters()}>
            <h1>Monsters</h1>
            <Scroll className='monsters-filters' width="100%">
                <SearchFilter />
                <DropDownFilter<ShortMonsterSchema> id="alignment" label="Alignment" />
                <DropDownFilter<ShortMonsterSchema> id="biome" label="Biome" />
                <CrFilter />
            </Scroll>
            <Scroll backgroundColor="#F1E5D1E0">
                <MonstersTable />
            </Scroll>
        </SearchableDataProvider>
    )
}