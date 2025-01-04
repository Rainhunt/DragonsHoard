import './cr-filter.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { Monster } from '../../../../services/responseValidators/getMonster'
import Slider from '../../../../components/Slider/Slider'
import { useSearchData } from '../../../../context/SearchableDataProvider'

const CrFilter: React.FC = () => {
    const { setFilterParameters } = useSearchData();
    const valueArray = [1 / 2, 1 / 4, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
    const displayArray = ["\u215B", "\u00BC", "\u00BD", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"]
    const [leftIndex, setLeftIndex] = useState<number>(0);
    const [rightIndex, setRightIndex] = useState<number>(42);
    const handleSliderChange = useCallback((left: number, right: number) => {
        setLeftIndex(left);
        setRightIndex(right);
    }, []);

    const crFilter = useCallback((monsters: Monster[]) => {
        return monsters.filter(monster => monster.CR >= valueArray[leftIndex] && monster.CR <= valueArray[rightIndex]);
    }, [leftIndex, rightIndex]);
    useEffect(() => {
        setFilterParameters(prev => ({ ...prev, cr: crFilter }));
    }, [crFilter]);

    return (
        <div className="filters-column cr">
            <Slider values={displayArray} onChange={handleSliderChange} thumbSize="20px" />
        </div>
    )
}

export default CrFilter;