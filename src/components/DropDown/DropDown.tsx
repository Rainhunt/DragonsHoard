import './drop-down.scss'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

type DropDownProps = {
    id: string;
    label: string;
    options: string[];
    setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const DropDown: React.FC<DropDownProps> = ({ id, label, options, setState }) => {
    const [selectedItem, setSelectedItem] = useState<string>("");
    const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value)
    }, []);
    useEffect(() => {
        setState((previous) => ({ ...previous, [id]: selectedItem }));
    }, [selectedItem, id, setState]);
    return (
        <div className="drop-down-container">
            <select
                className="drop-down-select"
                id={id}
                value={selectedItem}
                onChange={handleChange}
            >
                <option className="drop-down-option" value=""></option>
                {options.map((option) => (
                    <option className="drop-down-option" key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <label className={`drop-down-label ${selectedItem ? "drop-down-empty" : ""}`} htmlFor={id}>{label}</label>
        </div>
    )
}

export default DropDown;