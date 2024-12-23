import React, { useCallback, useEffect, useState } from 'react'
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import './codex-page.scss';
import Scroll from '../../components/statblock/components/Scroll/Scroll';
import DropDown from '../../components/DropDown/DropDown';
import AddButton from '../../components/Button/AddButton/AddButton';
import ScrollingContainer from '../../components/ScrollingContainer/ScrollingContainer';
import RemovableItem from '../../components/ScrollingContainer/RemovableItem/RemovableItem';

const CodexPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();
    const [monsters, setMonsters] = useState<Array<object>>();

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

    const [unselectedBiomes, setUnselectedBiomes] = useState(["Forest", "Desert", "Tundra"]);
    const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
    const [unselectedCreatureTypes, setUnselectedCreatureTypes] = useState(["Humanoid", "Beast", "Ooze"]);
    const [selectedCreatureTypes, setSelectedCreatureTypes] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<Record<string, string>>({
        biome: "",
        creatureType: ""
    });

    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./monster-codex-placeholder.jpg");
        }
        if (setMainMarginPx) {
            setMainMarginPx(300);
        }
        const getMonsters = async () => {
            try {
                const monsters = await new Request("monsters").get();
                if (typeof monsters !== "string") {
                    setMonsters(monsters as Array<object>);
                }
            } catch (err) {
                console.log(`Error fetching monsters: ${err}`);
            }
        }
        getMonsters();
    }, []);

    return (
        <>
            <h1>Monster Codex</h1>
            <Scroll width={"100%"}>
                <div className="rows-container">
                    <div className="row">
                        <DropDown id="biome" label="Environment" options={unselectedBiomes} setState={setSelectedItems} />
                        <AddButton onClick={() => {
                            const unselected = [...unselectedBiomes];
                            const selected = [...selectedBiomes];
                            relativeComplementArray(unselected, selected, selectedItems.biome);
                            setUnselectedBiomes(unselected);
                            setSelectedBiomes(selected);
                        }} />
                    </div>
                    <ScrollingContainer items={selectedBiomes.map((biome) => ({
                        id: biome, node: <RemovableItem text={biome} removeItem={() => {
                            const selected = [...selectedBiomes];
                            const unselected = [...unselectedBiomes];
                            relativeComplementArray(selected, unselected, biome);
                            setSelectedBiomes(selected);
                            setUnselectedBiomes(unselected);
                        }} />
                    }))} />
                </div>
                <div className="rows-container">
                    <div className="row">
                        <DropDown id="creatureType" label="Creature Type" options={unselectedCreatureTypes} setState={setSelectedItems} />
                        <AddButton onClick={() => {
                            const unselected = [...unselectedCreatureTypes];
                            const selected = [...selectedCreatureTypes];
                            relativeComplementArray(unselected, selected, selectedItems.creatureType);
                            setUnselectedCreatureTypes(unselected);
                            setSelectedCreatureTypes(selected);
                        }} />
                    </div>
                    <ScrollingContainer items={selectedCreatureTypes.map((creatureType) => ({
                        id: creatureType, node: <RemovableItem text={creatureType} removeItem={() => {
                            const selected = [...selectedCreatureTypes];
                            const unselected = [...unselectedCreatureTypes];
                            relativeComplementArray(selected, unselected, creatureType);
                            setSelectedCreatureTypes(selected);
                            setUnselectedCreatureTypes(unselected);
                        }} />
                    }))} />
                </div>
                <div className="rows-container">
                    <div className="row">
                        <DropDown id="biome" label="CR (Sliding Bar)" options={[]} setState={setSelectedItems} />
                        {/* <AddButton /> */}
                    </div>
                    <div className="row scrolling-container">Scrolling Container</div>
                </div>
                <div className="rows-container">
                    <div className="row drop-down">Biome</div>
                    <div className="row scrolling-container">Scrolling Container</div>
                </div>
            </Scroll>
            {monsters ? monsters.map((value) => (<div>{JSON.stringify(value)}</div>)) : "No monsters here"}
        </>
    )
}

export default CodexPage;