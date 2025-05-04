import './searchable-drop-down.scss';
import { ChangeEventHandler, Dispatch, InputHTMLAttributes, KeyboardEventHandler, SetStateAction, useCallback, useEffect, useMemo, useState } from "react"
import { PositionAlign } from "../../../types/styleTypes";
import DropDown from "../DropDown";
import Input from "../../Input/Input";
import classNameConstructor from "../../../../utils/classNameConstructor";

export type SearchableDropDownState = {
    value: string;
    selectedOptions: string[];
}

type SearchableDropDownProps = {
    className?: string;
    id: string;
    label: {
        text: string;
        isIdle?: "floatAbove" | "hidden" | "inline";
        isActive?: "floatAbove" | "hidden";
    };
    selectedOptions: string[];
    setSelectedOptions: Dispatch<SetStateAction<string[]>>;
    attributes?: InputHTMLAttributes<HTMLInputElement>;
    children: string[];
} & OR<{ column?: boolean }, { row?: boolean }> & PositionAlign;

export default function SearchableDropDown({ className, id, label, selectedOptions, setSelectedOptions, children, attributes, position = "bottom", align = "left", row }: SearchableDropDownProps) {
    const [value, setValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(children);
    const [focusedIndex, setFocusedIndex] = useState(0);

    const containerClass = useMemo(() => classNameConstructor(
        "searchable-drop-down-label",
        className
    ), [className]);

    useEffect(() => {
        setFilteredOptions(children);
    }, [children]);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        setValue(e.target.value);
        if (attributes?.onChange) attributes.onChange(e);
    }, [attributes?.onChange]);
    useEffect(() => {
        setFilteredOptions(children.filter(option => value === undefined || option.toLowerCase().includes(value.toLowerCase())));
        setFocusedIndex(0);
    }, [value]);

    const handleSelect = useCallback((option: string) => {
        setSelectedOptions((prev) => {
            const index = prev.indexOf(option);
            if (index === -1) {
                return [...prev, option];
            } else {
                return prev.filter(selected => selected !== option);
            }
        });
        setValue("");
    }, []);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>((e) => {
        switch (e.key) {
            case "Enter":
                handleSelect(filteredOptions[focusedIndex]);
                break;
            case "ArrowDown":
                setFocusedIndex(prev => prev < filteredOptions.length - 1 ? prev + 1 : 0);
                break;
            case "ArrowUp":
                setFocusedIndex(prev => prev > 0 ? prev - 1 : filteredOptions.length - 1);
        }
    }, [focusedIndex, filteredOptions]);

    return (
        <DropDown label={<div className={containerClass}>
            <Input id={id} label={label} attributes={{
                ...attributes,
                value: value,
                onChange: handleChange,
                onKeyDown: handleKeyDown
            }} />
        </div>} openOn="click" closeOn="click-off" position={position as "bottom"} align={align as "left"} row={row}> {/* ts can't discern the OR<> type from this side*/}
            {filteredOptions.map(option =>
                <option
                    key={option}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(option)}
                    className={classNameConstructor(
                        "drop-down-option",
                        selectedOptions.includes(option) && "drop-down-selected",
                        filteredOptions[focusedIndex] === option && "drop-down-focused"
                    )}>
                    {option}
                </option>)}
        </DropDown>
    )
}