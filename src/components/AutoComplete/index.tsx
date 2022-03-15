import React, { FC, forwardRef } from "react";
import { GoogleMaps } from "../../hooks/GoogleMaps";
import Select, { StylesConfig } from "react-select";
import "./autoComplete.css";

interface AutoCompleteProps {
  apiKey: string;
  selectStyles?: StylesConfig;
  errorHandler?: (error: Error) => void;
  selectPlaceHolder?: string;
}

const AutoComplete: FC<AutoCompleteProps> = forwardRef((props) => {
    
  const { apiKey, selectStyles, errorHandler, selectPlaceHolder } = props;

  const { suggestions, fetchSuggestions } = GoogleMaps({
    apiKey,
    errorHandler,
  });

  const handleSearch = (search: string) => {
    if (search) {
      fetchSuggestions(search);
    }
  };

  return (
    <div className="auto-complete">
      <Select
        options={suggestions}
        onInputChange={handleSearch}
        styles={selectStyles}
        placeholder={selectPlaceHolder ?? "Search your location"}
      />
    </div>
  );
});

export default AutoComplete;
