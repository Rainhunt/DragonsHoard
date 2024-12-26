import React, { useCallback, useEffect, useState } from 'react'
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import Scroll from '../../components/Scroll/Scroll';
import DropDown from '../../components/DropDown/DropDown';
import AddButton from '../../components/Button/AddButton/AddButton';
import ScrollingContainer from '../../components/ScrollingContainer/ScrollingContainer';
import RemovableItem from '../../components/ScrollingContainer/RemovableItem/RemovableItem';
import './codex-page.scss';
import HeaderSortScroll from '../../components/Scroll/HeaderSortScroll/HeaderSortScroll';
import { Monster, monstersSchema } from '../../services/responseValidators/getMonster';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routerModel';

const CodexPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const navigate = useNavigate();

    const [unselectedBiomes, setUnselectedBiomes] = useState(["Forest", "Desert", "Tundra"]);
    const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
    const [unselectedCreatureTypes, setUnselectedCreatureTypes] = useState(["Humanoid", "Beast", "Ooze"]);
    const [selectedCreatureTypes, setSelectedCreatureTypes] = useState<string[]>([]);
    const [minCrRange, setMinCrRange] = useState<string[]>(["\u215B"]);
    const [maxCrRange, setMaxCrRange] = useState(["\u215B",]);
    const [selectedItems, setSelectedItems] = useState<Record<string, string>>({
        biome: "",
        creatureType: ""
    });
    const [selectedColumns, setSelectedColumns] = useState([{ label: "Name", id: "name" }, { label: "CR", id: "CR" }, { label: "Type", id: "type" }, { label: "Environment", id: "biome" }, { label: "hamburger", id: "view", noSort: true }]);
    const [unselectedColumns, setUnselectedColumns] = useState(["Humanoid", "Beast", "Ooze"]);

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

    //Array is alphabetically sorted. Sample is small so optimizations unnecessary
    const relativeComplementArray = useCallback((array: string[], complement: string[], id: string) => {
        const index = array.indexOf(id);
        if (index !== -1) {
            array.splice(index, 1);

            for (let i = 0; i < complement.length; i++) {
                if (complement[i] > id) {
                    complement.splice(i, 0, id);
                    return;
                }
            }
            complement.push(id);
        }
    }, []);

    const handleRelativeComplement = (id: string, array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, targetArray: string[], setTargetArray: React.Dispatch<React.SetStateAction<string[]>>) => {
        const newArray = [...array];
        const newTargetArray = [...targetArray];
        relativeComplementArray(newArray, newTargetArray, id);
        setArray(newArray);
        setTargetArray(newTargetArray);
        console.log(newArray);
        console.log(newTargetArray);

    }

    return (
        <>
            <h1>Monster Codex</h1>
            <Scroll className="filters" width={"100%"}>
                <div className="filters-column">
                    <div className="row">
                        <DropDown id="biome" label="Environment" options={unselectedBiomes} setState={setSelectedItems} />
                        <AddButton onClick={() => handleRelativeComplement(selectedItems.biome, unselectedBiomes, setUnselectedBiomes, selectedBiomes, setSelectedBiomes)} />
                    </div>
                    <ScrollingContainer items={selectedBiomes.map((biome) => ({
                        id: biome, node: <RemovableItem text={biome} removeItem={() => handleRelativeComplement(biome, selectedBiomes, setSelectedBiomes, unselectedBiomes, setUnselectedBiomes)} />
                    }))} />
                </div>
                <div className="filters-column">
                    <div className="row">
                        <DropDown id="creatureType" label="Creature Type" options={unselectedCreatureTypes} setState={setSelectedItems} />
                        <AddButton onClick={() => handleRelativeComplement(selectedItems.creatureType, unselectedCreatureTypes, setUnselectedCreatureTypes, selectedCreatureTypes, setSelectedCreatureTypes)} />
                    </div>
                    <ScrollingContainer items={selectedCreatureTypes.map((creatureType) => ({
                        id: creatureType, node: <RemovableItem text={creatureType} removeItem={() => handleRelativeComplement(creatureType, selectedCreatureTypes, setSelectedCreatureTypes, unselectedCreatureTypes, setUnselectedCreatureTypes)} />
                    }))} />
                </div>
                <div className="filters-column cr">
                    <div className="row">
                        <DropDown id="minCr" label="CR Min" options={minCrRange} setState={setSelectedItems} />
                    </div>
                    <div className="row">
                        <DropDown id="maxCr" label="Max" options={maxCrRange} setState={setSelectedItems} />
                    </div>
                </div>
                <div className="filters-column">
                    <div className="row drop-down">Biome</div>
                    <div className="row scrolling-container">Scrolling Container</div>
                </div>
            </Scroll>
            <HeaderSortScroll<Monster> headers={selectedColumns} data={monsters ? monsters.map(monster => {
                monster.view = <Button className="view-more-button" text="View More" onClick={() => navigate(ROUTES.MONSTER_STATBLOCK + `/${monster._id}`)} />;
                return monster
            }) : []} setData={setMonsters} />
        </>
    )
}

export default CodexPage;