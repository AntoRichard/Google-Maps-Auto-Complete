import React, { FC, useEffect } from 'react'
import "./autoComplete.css"
import { GoogleMaps } from '../../hooks/GoogleMaps';
import Select, { StylesConfig } from 'react-select'

interface AutoCompleteProps {
    apiKey: string;
    style?: StylesConfig,
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { apiKey, style } = props;

    const { suggestions, fetchSuggestions } = GoogleMaps({
        apiKey,
    });


    const handleSearch = (search: string) => {
        if(search) {
            fetchSuggestions(search);
        }
    }

    console.log(suggestions);
    
    return (
        <div className="auto-complete">
            <Select options={suggestions} onInputChange={handleSearch} styles={style} />
        </div>
    )
}

export default AutoComplete;