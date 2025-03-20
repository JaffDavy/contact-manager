import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({
    value,
    onChange,
    onGroupSelect,
    selectedGroup,
    groups
}) => {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <div className="search-icon">
                    <Search className="h-5 w-5" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search contacts..."
                    className="search-input"
                />
            </div>
            <select
                value={selectedGroup}
                onChange={(e) => onGroupSelect(e.target.value)}
                className="group-select"
            >
                <option value="all">All Groups</option>
                {groups.map((group) => (
                    <option key={group} value={group}>
                        {group}
                    </option>
                ))}
            </select>
        </div>
    );
};