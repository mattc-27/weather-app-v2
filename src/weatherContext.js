import React, { useState, useEffect, createContext } from 'react';
import WeatherIcons from './WeatherIcons';
import Backgrounds from './Backgrounds';
import { getRandomItem } from './weatherServices';
const WeatherContext = createContext();

function WeatherProvider({ children }) {

    const [location, setLocation] = useState({});
    const [currentConditions, setCurrentConditions] = useState('');
    const [ background, setBackground] = useState('');


    useEffect(() => {
        //const userData = JSON.parse(localStorage.getItem('userDetails'))
        console.log(location);
        localStorage.setItem('weatherConditions', JSON.stringify(currentConditions));

    }, [currentConditions])



 function getBackground(currentLocation) {
    if (currentLocation.names === undefined) {
        const currentImage = getRandomItem(currentLocation.images)
        setBackground(`url(${currentImage.value})`)
    } else {
        const currentCity = currentLocation.names.find(({ name }) => name === response.name)
        if (currentCity === undefined) {
            const currentImage = getRandomItem(currentLocation.images)
            setBackground(`url(${currentImage.value})`)
        } else {
            const result = getRandomItem(currentCity.images)
            setBackground(`url(${result.value})`)
        }
    }
 }

    return (
        <WeatherContext.Provider value={{ location, setLocation, setCurrentConditions, currentConditions, getBackground, background, setBackground }}>
            {children}
        </WeatherContext.Provider>
    )
}

export { WeatherContext, WeatherProvider };