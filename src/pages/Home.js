import './pages.css';
import WeatherData from '../components/WeatherData/WeatherData';
import React from 'react';
import { useGlobalContext } from '../components/context';

const Home = () => {
    const {weather, loading} = useGlobalContext();
    
    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {weather.data !== '' ? <WeatherData/>: <h2>Please search for city...</h2>}
        </div>
    );
};

export default Home;