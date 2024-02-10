import React, { useState, useEffect } from 'react'
import WeatherIcons from '../WeatherIcons';


export default function Hourly({ hour, tempF }) {

    const getIcon = (code) => {
        const iconData = WeatherIcons.find(({ code: iconCode }) => iconCode === code);
        return iconData ? iconData.forecast : null;
    };

    return (
        <div style={{width: '100%'}}>
            {tempF ?
                <div className='forecastCard' >
                    <p className='text-hourly' key={hour.time}>{hour.time.split(' ')[1]}</p>
                    <p className='text-hourly' key={hour.time}>{getIcon(hour.condition.code)}</p>
                    <p className='text-hourly' key={hour.time}>{hour.temp_f}°F</p>
                </div>
                :
                <div className='forecastCard' >
                    <p className='text-hourly' key={hour.time}>{hour.time.split(' ')[1]}</p>
                    <p className='text-hourly' key={hour.time}>{getIcon(hour.condition.code)}</p>
                    <p className='text-hourly' key={hour.time}>{hour.temp_c}°C</p>
                </div>
            }
        </div>
    );
}