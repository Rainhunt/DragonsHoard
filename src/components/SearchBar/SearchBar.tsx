import './search-bar.scss';
import { ChangeEvent, KeyboardEvent, useCallback, useMemo } from "react";
import classNameConstructor from "../../utils/classNameConstructor";

type SearchBarProps = {
    className?: string;
    placeholder?: string;
    ariaLabel?: string;
    value?: string;
    onChange?: (value: string) => void;
    onEnter?: (value: string) => void;
}

export default function SearchBar({ className, placeholder, ariaLabel, value, onChange, onEnter }: SearchBarProps) {
    const inputClass = useMemo(() => classNameConstructor(
        "search-bar",
        className
    ), [className]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e.currentTarget.value);
    }, [onChange]);
    const handlePressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (onEnter && e.key === "Enter") onEnter(e.currentTarget.value);
    }, [onEnter]);

    return (
        <input
            className={inputClass}
            type="text"
            placeholder={placeholder}
            aria-label={ariaLabel}
            value={value}
            onChange={handleChange}
            onKeyDown={handlePressEnter}
        />
    )
}