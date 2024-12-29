import React, { useState, useCallback } from 'react';
import './search-bar.scss';

interface SearchBarProps {
    onSearch?: (query: string) => void;
    onEnterSearch?: (query: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onEnterSearch, placeholder = "Search...", ariaLabel = "Search bar", className }) => {
    const [query, setQuery] = useState<string>("");

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        if (onSearch) onSearch(newQuery);
    }, [onSearch]);

    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterSearch && event.key === "Enter") onEnterSearch(query);
    }, [query, onEnterSearch]);

    return (
        <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            aria-label={ariaLabel}
            className={`search-bar ${className}`}
        />
    );
};

export default SearchBar;
