import React, { useState, useEffect, useContext } from 'react';
import Hourly from './components/HourlyCard';
import { WeatherContext } from "./weatherContext";

export default function CurrentWeather() {

    const { currentConditions, setCurrentConditions, getWeather, background } = useContext(WeatherContext);

    console.log(background)
    const [tempF, setTempF] = useState(true)

    function changeTemp() {
        if (!tempF) {
            setTempF(true)
        } else setTempF(false)
    }

    return (
        <div className='current-weather'>
            {/* MAIN CONTAINER */}
            {currentConditions && background &&
                <div className='main-section'>
                    {/* CURRENT*/}
                    <div className='main-weather'>
                        <div className='main-weather-content conditions-location'>
                            <h2 >{currentConditions.name}, {currentConditions.region}</h2>
                        </div>
                        <div className='main-weather-content conditions-temp'>
                            <p>{currentConditions.formatIcon.value}</p>
                            <p >{currentConditions.temp_f.toFixed()}°F</p>
                        </div>
                        <div className='main-weather-content conditions-desc'>
                            <p >{currentConditions.condition.text}</p>
                        </div>
                    </div>
                    <div className='img-container ' style={{
                        backgroundImage: `${background}`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    {/* HOURLY 
                               <div className='section-title-forecast'>
                            <h2>Hourly Forecast</h2>
                        </div>
*/}

                    <div className='main-hourly'>
                        <div className='hourly-row'>
                            {
                                currentConditions.forecastday[0].hour.filter((_, index) => index % 4 === 0).map(hour => (
                                    <Hourly hour={hour} tempF={tempF} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}