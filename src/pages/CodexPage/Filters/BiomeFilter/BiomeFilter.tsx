import React, { useCallback, useEffect, useState } from 'react'
import DropDown from '../../../../components/DropDown/DropDown'
import useRelativeComplement from '../../../../hooks/handleRelativeComplement'
import AddButton from '../../../../components/Button/AddButton/AddButton'
import ScrollingContainer from '../../../../components/ScrollingContainer/ScrollingContainer'
import RemovableItem from '../../../../components/ScrollingContainer/RemovableItem/RemovableItem'
import { Monster } from '../../../../services/responseValidators/getMonster'

type BiomeFilterProps = {
    setFilterParameters: React.Dispatch<React.SetStateAction<Record<string, (monsters: Monster[]) => Monster[]>>>;
    unfilteredMonsters: Monster[]
}

const BiomeFilter: React.FC<BiomeFilterProps> = ({ unfilteredMonsters, setFilterParameters }) => {
    const [dropDownSelected, setDropDownSelected] = useState<Record<string, string>>({
        biome: ""
    });

    const [unselectedBiomes, setUnselectedBiomes] = useState<string[]>([]);
    const [selectedBiomes, setSelectedBiomes] = useState<string[]>([]);
    useEffect(() => {
        const uniqueBiomes: string[] = [];
        for (const monster of unfilteredMonsters) {
            const biome = monster.biome;
            if (!uniqueBiomes.includes(biome)) uniqueBiomes.push(biome);
        }
        uniqueBiomes.sort();
        setUnselectedBiomes(uniqueBiomes);
        setSelectedBiomes([]);
    }, [unfilteredMonsters]);

    const biomeFilter = useCallback((monsters: Monster[]) => {
        return monsters.filter(monster => selectedBiomes.length === 0 || selectedBiomes.includes(monster.biome));
    }, [selectedBiomes]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, biome: biomeFilter }));
    }, [biomeFilter]);

    const { handleRelativeComplement } = useRelativeComplement();
    return (
        <div className="filters-column">
            <div className="row">
                <DropDown id="biome" label="Environment" options={unselectedBiomes} setState={setDropDownSelected} />
                <AddButton onClick={() => handleRelativeComplement(dropDownSelected.biome, unselectedBiomes, setUnselectedBiomes, selectedBiomes, setSelectedBiomes)} />
            </div>
            <ScrollingContainer items={selectedBiomes.map((biome) => ({
                id: biome, node: <RemovableItem text={biome} removeItem={() => handleRelativeComplement(biome, selectedBiomes, setSelectedBiomes, unselectedBiomes, setUnselectedBiomes)} />
            }))} />
        </div>
    )
}

export default BiomeFilter;