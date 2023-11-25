import React, { useState, useEffect } from 'react';
import { GoLocation } from "react-icons/go";

export default function Search({ setQuery }) {

    const [predictions, setPredictions] = useState([]);
    const [searchInput, setSearchInput] = useState({ p: '' });

    const clearInput = () => {
        setSearchInput({ p: '' });
    };

    const handleChange = (e) => {
        setSearchInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
            { input: searchInput.p },
            (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setPredictions(predictions);
                }
            }
        );
    };

    const handleClick = (prediction) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
                const location = results[0].geometry.location;
                const queryVariable = `${location.lat()},${location.lng()}`;
                console.log(queryVariable);
                setQuery({ q: queryVariable });
                clearInput();
            }
        });
    };

    const handleButtonClick = () => {
        const queryVariable = searchInput.p
        setQuery({ q: queryVariable })
    }


    return (
        <div className='col content-center items-center w-70'/* style={{position: 'absolute', zIndex: '99999', top: '90px'}}/* style={{position: 'absolute', zIndex: '100000', top: '30%'}}  style={{position: 'absolute', zIndex: '9999999', top: '10%'}}*/ >
            <div className='searchInputs ' style={{}} >
                {/*  <GoLocation size={30} style={{ color: "#394867", margin: '1px' }} /> */}
                <input type='text' onChange={handleChange}
                    value={searchInput.p}
                    name='p'
                    placeholder='Search a city or postal code'
                />
            </div>
            {searchInput.p.length != 0 && predictions.length >= 1 && (
                <div className="dataResult  " style={{ alignSelf: 'center' }}>
                    {predictions.map((prediction) => {
                        return (
                            <p
                                key={prediction.place_id}
                                onClick={() => handleClick(prediction)}
                                style={{ cursor: 'pointer' }}
                            >
                                {prediction.description}
                            </p>
                        )
                    })}
                </div>
            )}
        </div>
    );
}