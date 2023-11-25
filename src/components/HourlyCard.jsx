import React, { useState, useEffect } from 'react'
import WeatherIcons from '../WeatherIcons';
import '../style.css'

export default function HourlyCard({ hour, tempF }) {

    const getIcon = (code) => {
        const iconData = WeatherIcons.find(({ code: iconCode }) => iconCode === code);
        return iconData ? iconData.forecast : null;
    };

    return (
        <>
            {tempF ?
                <div className='col content-even items-center w-100' style={{ margin: '0.5%', height: '30%', color: '#252525', height: '300px', border: '1px solid #000' }}>
                    <p className='text-hourly' key={hour.time}>{getIcon(hour.condition.code)}</p>
                    <p className='text-hourly' key={hour.time}>{hour.temp_f}°F</p>
                    <p className='text-hourly' key={hour.time}>{hour.time.split(' ')[1]}</p>
                </div>
                :
                <div className='col content-even items-center w-100' style={{ margin: '0.5%', height: '30%', color: '#252525', height: '300px', border: '1px solid #000' }}>
                    <p className='text-hourly' key={hour.time}>{getIcon(hour.condition.code)}</p>
                    <p className='text-hourly' key={hour.time}>{hour.temp_c}°C</p>
                    <p className='text-hourly' key={hour.time}>{hour.time.split(' ')[1]}</p>
                </div>
            }
        </>
    );
}