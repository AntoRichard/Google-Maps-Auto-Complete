import { useEffect, useState } from "react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import { useDebouncedCallback } from 'use-debounce';
import autocompletionRequestBuilder from  "../../helpers/AutocompleteRequest";
import { AutocompletionRequest } from "../../types/autocomplete.type";
import { Option } from "../../types/option.type";

interface GoogleMapsProps {
    apiKey: string,
    withSessionToken?: boolean,
    autocompletionRequest?: AutocompletionRequest,
    minLengthAutocomplete?: number,
    apiOptions?: LoaderOptions,
    errorHandler?: (error: Error) => void;
    debounce?: number,
}

export const GoogleMaps = ({
    apiKey,
    withSessionToken = false,
    apiOptions,
    autocompletionRequest = {},
    minLengthAutocomplete = 0,
    errorHandler,
    debounce = 300
}: GoogleMapsProps) => {

    const [placesService, setPlacesService] = useState<google.maps.places.AutocompleteService | undefined>(undefined);

    const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | undefined>(undefined);
    
    const [suggestions, setSuggestions] = useState<Option[]>([]);

    /* Basic initialization */
    const initializeService = () => { 
        if (!window.google) throw new Error('Google script not loaded');
        if (!window.google.maps) throw new Error('Google maps script not loaded');
        if (!window.google.maps.places) throw new Error('Google maps places script not loaded');

        setPlacesService(new window.google.maps.places.AutocompleteService());
        setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
    }

    const init = async () => {

        const loaderOptions: LoaderOptions = {
            apiKey,
            libraries: ["places"],
            ...apiOptions,
        }

        try {
            if(!window?.google?.maps?.places) {
                await new Loader(loaderOptions).load();
            }
            initializeService();
        } catch (error) {
            errorHandler && errorHandler(error);
            console.error(error?.message);
        }
    }

    useEffect(() => {
        if(apiKey) {
            init();
        } else {
            initializeService();
        }
    }, []);

    /* Get Suggestion */ 
    const fetchSuggestions = useDebouncedCallback((value: string): void => {
        if (!placesService) {
            return;
        }
        if (value.length < minLengthAutocomplete) return;
    
        const autocompletionReq: AutocompletionRequest = { ...autocompletionRequest };
    
        placesService?.getPlacePredictions(
          autocompletionRequestBuilder(
            autocompletionReq,
            value,
            withSessionToken && sessionToken,
          ), (suggestions) => {
            setSuggestions((suggestions || []).map(suggestion => ({ label: suggestion.description, value: suggestion.description })));
          },
        );
      }, debounce);
    return {
        suggestions,
        fetchSuggestions,
    }
}