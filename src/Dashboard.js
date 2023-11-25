import React, { useState, useEffect } from 'react';
import { getWeatherData, getRandomItem } from './weatherServices';
import toast, { Toaster } from 'react-hot-toast';
// components
import Search from './components/Search';
import HourlyCard from './components/HourlyCard';
// Background URLs
import Backgrounds from './Backgrounds';

export default function Dashboard() {
    const [query, setQuery] = useState({ q: '' });
    const [weather, setWeather] = useState('');
    const [background, setBackground] = useState('');
    const [tempF, setTempF] = useState(true)


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
                    loading: 'Fetching weather...',
                    success: 'Got the weather ☃️ !',
                    error: 'Error when fetching',
                },
                    {
                        style: {
                            minWidth: '270px',
                            height: '100px',
                            background: '#fafafa',
                            color: '#252525',
                            fontFamily: 'Cabin',
                            fontSize: '1.5em'
                        },
                        success: {
                            duration: 2000
                        },
                    }
                )
                // set weather data
                setWeather(response);
                console.log(response);

                // fetch,set background image 
                const currentLocation = Backgrounds.images.find(({ region }) => region === response.region)

                console.log(currentLocation)
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

    function changeTemp() {
        if (!tempF) {
            setTempF(true)
        } else setTempF(false)
    }

    return (
        <>
        <header>
            <div className='title-main'>
                <h1>Weather App</h1>
            </div>
            <Search setQuery={setQuery} />
            <Toaster />
        </header>
        {weather && (
            <>
                <div className='col' style={{ height: 'auto' }}>
                    <div style={{
                               height: '100vh',
                               backgroundColor: '#252525',
                               display: 'flex',
                               flexDirection: 'col',
                               margin: '0',
                    }}>
                        <div className='main-container'>
                        <div className='main-content' style={{ height: '100%', minWidth: '0', width: '50%', margin: '0 1%', /* border: '1px solid #fff' */ }}>
                                    <div className='query-conditions' style={{ /* maxWidth: '70%', position: 'absolute', zIndex: '8000', top: '35%',  */background: '#77787937', backdropFilter: 'blur(5px)' }}>
                                        <div className='row content-start items-center text-style-1' >
                                            <p>{weather.name}, {weather.region}</p>
                                        </div>
                                        <div className='row content-start items-center text-style-2' style={{ marginLeft: '1%' }}>
                                            <p>{weather.temp_f.toFixed()}°F</p>
                                        </div>
                                        <div className='row content-start items-center text-style-3' style={{ marginLeft: '1%' }}>
                                            <p style={{ alignSelf: 'flex-start', margin: '0' }}>{weather.formatIcon.value}</p>
                                            <p>{weather.condition.text}</p>
                                        </div>
                                    </div>
                                </div>
                            <div className='col content-end w-100 location-bg' style={{
                                  backgroundImage: `${background}`,
                                  backgroundSize: 'cover'
                            }}>
                            </div>
                        </div>
                    </div>
                    <div className='col' style={{ backgroundColor: '#fafafa', height: '100%', width: '100%' }}>
                        <div className='col m-2' >
                            <div className='subtitle-h2 m-1' /* style={{fontSize: '2em', fontFamily: 'Cabin', fontWeight: '200', color: '#000221'}} */>
                                <h2>Hourly Forecast</h2>
                            </div>
                            <div className='row w-30 items-start m-1' /* style={{border: '1px solid #000'}} */>
                                <button
                                    className='temp-btn'
                                    onClick={changeTemp}>
                                    °F
                                </button>
                                <button
                                    className='temp-btn'
                                    onClick={changeTemp}>
                                    °C
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <>
                                {
                                    weather.forecastday[0].hour.filter((_, index) => index % 3 === 0).map(hour => (
                                        <HourlyCard hour={hour} tempF={tempF} />
                                    ))
                                }
                            </>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
    );
}