import './pages.css';
import WeatherData from '../components/WeatherData/WeatherData';
import React from 'react';
import { useGlobalContext } from '../components/context';

const Home = () => {
    const {weather, searchTerm} = useGlobalContext();
    // console.log(WeatherData);
    return (
        <div>
            {/* {weather.data === '' || weather.data.cod !== '404' ?  <WeatherData/> : <h1>Failed to fetch the weather details of requested city</h1>} */}
            {weather.data !== '' ? <WeatherData/>: <h2>Please search for city...</h2>}
        </div>
    );
};

export default Home;