import { useCallback, useEffect, useState } from "react";
import { useSearchableData } from "../../../context/SearchableDataProvider";
import { MonsterSchema } from "../../../services/requests/monsters/getMonsters/responseValidator";
import Slider from "../../../components/Slider/Slider";
import parseFractional from "../../../utils/parseFractional";

const values = ["\u215b", "\u00bc", "\u00bd", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"]

export default function CrFilter() {
    const { setFilterParameters } = useSearchableData<MonsterSchema>();
    const [range, setRange] = useState({ low: "\u215b", high: "40" });
    useEffect(() => setFilterParameters(prev => ({
        ...prev,
        cr: (monsters) => monsters.filter(monster => parseFractional(range.low) <= monster.CR && monster.CR <= parseFractional(range.high))
    })), [range]);

    const handleChange = useCallback((left: string, right: string) => setRange({ low: left, high: right }), []);

    return (
        <div>
            <Slider values={values} onChange={handleChange} />
            <span>Low: {range.low}</span>
            <span>High: {range.high}</span>
        </div>
    )
}