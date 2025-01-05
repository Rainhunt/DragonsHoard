import React, { useCallback, useEffect, useState } from 'react'
import DropDown from '../../../../components/DropDown/DropDown'
import useRelativeComplement from '../../../../hooks/handleRelativeComplement'
import AddButton from '../../../../components/Button/AddButton/AddButton'
import ScrollingContainer from '../../../../components/ScrollingContainer/ScrollingContainer'
import RemovableItem from '../../../../components/ScrollingContainer/RemovableItem/RemovableItem'
import { Monster } from '../../../../services/responseValidators/getMonsters'

type CreatureTypeFilterProps = {
    setFilterParameters: React.Dispatch<React.SetStateAction<Record<string, (monsters: Monster[]) => Monster[]>>>;
    unfilteredMonsters: Monster[]
}

const CreatureTypeFilter: React.FC<CreatureTypeFilterProps> = ({ unfilteredMonsters, setFilterParameters }) => {
    const [dropDownSelected, setDropDownSelected] = useState<Record<string, string>>({
        creatureType: ""
    });

    const [unselectedCreatureTypes, setUnselectedCreatureTypes] = useState<string[]>([]);
    const [selectedCreatureTypes, setSelectedCreatureTypes] = useState<string[]>([]);
    useEffect(() => {
        const uniqueCreatureTypes: string[] = [];
        for (const monster of unfilteredMonsters) {
            const creatureType = monster.type;
            if (!uniqueCreatureTypes.includes(creatureType)) uniqueCreatureTypes.push(creatureType);
        }
        uniqueCreatureTypes.sort();
        setUnselectedCreatureTypes(uniqueCreatureTypes);
        setSelectedCreatureTypes([]);
    }, [unfilteredMonsters]);

    const creatureTypeFilter = useCallback((monsters: Monster[]) => {
        return monsters.filter(monster => selectedCreatureTypes.length === 0 || selectedCreatureTypes.includes(monster.type));
    }, [selectedCreatureTypes]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, creatureType: creatureTypeFilter }));
    }, [creatureTypeFilter]);

    const { handleRelativeComplement } = useRelativeComplement();
    return (
        <div className="filters-column">
            <div className="row">
                <DropDown id="creatureType" label="Creature Type" options={unselectedCreatureTypes} setState={setDropDownSelected} />
                <AddButton onClick={() => handleRelativeComplement(dropDownSelected.creatureType, unselectedCreatureTypes, setUnselectedCreatureTypes, selectedCreatureTypes, setSelectedCreatureTypes)} />
            </div>
            <ScrollingContainer items={selectedCreatureTypes.map((type) => ({
                id: type, node: <RemovableItem text={type} removeItem={() => handleRelativeComplement(type, selectedCreatureTypes, setSelectedCreatureTypes, unselectedCreatureTypes, setUnselectedCreatureTypes)} />
            }))} />
        </div>
    )
}

export default CreatureTypeFilter;