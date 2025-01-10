import './cr-filter.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { Monster } from '../../../../services/responseValidators/monsters/getMonsters'
import Slider from '../../../../components/Slider/Slider'
import { useSearchData } from '../../../../context/SearchableDataProvider'
import { crDisplayArray, crValueArray } from '../../../../assets/monsterArrays'

const CrFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
    const [leftIndex, setLeftIndex] = useState<number>(0);
    const [rightIndex, setRightIndex] = useState<number>(42);
    const handleSliderChange = useCallback((left: number, right: number) => {
        setLeftIndex(left);
        setRightIndex(right);
    }, []);

    const crFilter = useCallback((monsters: Monster[]) => {
        return monsters.filter(monster => monster.CR >= crValueArray[leftIndex] && monster.CR <= crValueArray[rightIndex]);
    }, [leftIndex, rightIndex]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, cr: crFilter }));
    }, [crFilter]);

    return (
        <div className="filters-column cr">
            <Slider values={crDisplayArray} onChange={handleSliderChange} thumbSize="20px" />
        </div>
    )
}

export default CrFilter;