import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Backgrounds from '../Backgrounds';
import SearchComponent from './SearchComponent';
import Footer from './Footer';
import CurrentWeather from '../CurrentWeather';
import { WeatherContext } from "../weatherContext";
import { getWeatherData, getRandomItem } from '../weatherServices';

export default function Layout() {

    const [query, setQuery] = useState({ q: '' });
    const [weather, setWeather] = useState('');

    const { currentConditions, setCurrentConditions, getWeather, getBackground, background, setBackground } = useContext(WeatherContext);

    useEffect(() => {
        async function getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                //setQuery({q: 'San Francisco'})
                console.log('Geolocation not suppoerted')
            }
        }
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setQuery({ q: `${latitude},${longitude}` })
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        }
        function error() {
            //setQuery({q: 'San Francisco'})
            console.log('Unable to retrieve your location')
        }
        getUserLocation()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await toast.promise(getWeatherData(query), {
                    loading: 'Coming up with weather puns is a breeze.',
                    success: 'Coming up with weather puns is a breeze.',
                    error: 'Error when fetching',
                },
                    {
                        style: {
                            minWidth: '270px',
                            height: '120px',
                            background: '#fafafa',
                            color: '#252525',
                            fontFamily: 'Lato',
                            fontSize: '1.5em',
                            fontWeight: '500',
                            textAlign: 'center',

                        },
                        success: {
                            duration: 2000,
                            icon: null
                        },
                    }
                )
                // set weather data
                console.log(response)
                setCurrentConditions(response)

                const currentLocation = Backgrounds.images.find(({ region }) => region === response.region)

                console.log(currentLocation)
                await getBackground(currentLocation)

            } catch (error) {
                console.error(error.message)
            }
        }
        fetchData()
            .catch(console.error);
    }, [query]);

    const getIcon = (code) => {
        const iconData = WeatherIcons.find(({ code: iconCode }) => iconCode === code);
        return iconData ? iconData.forecast : null;
    };

    const [tempF, setTempF] = useState(true)

    function changeTemp() {
        if (!tempF) {
            setTempF(true)
        } else setTempF(false)
    }

    function Loading() {
        return (
            <div className='loading' style={{ fontFamily: 'Lato', fontSize: '1.5em', fontWeight: '300' }}>
                <p><i>Coming up with weather puns is a breeze.</i></p>;
            </div>
        )
    }

    return (
        <>
            <SearchComponent setQuery={setQuery} />
            <Toaster containerStyle={{
                position: 'absolute',
                zIndex: '999999999999999999',
                top: '5%'
            }} />
            {currentConditions ?
                <CurrentWeather currentConditions={currentConditions} />
                : null
            }
            <Footer />
        </>
    );
}