import React, {useState} from 'react';
import styles from './WeatherData.module.css';
import { FaCloudShowersHeavy, FaHeart, FaThermometerThreeQuarters, FaRegHeart, FaWind } from 'react-icons/fa';
import {BsDroplet} from 'react-icons/bs';
import {MdVisibility} from 'react-icons/md';
import {useGlobalContext} from '../context';
import {useLocalStorageState} from '../useLocalStorageState';

const WeatherData = props => {
    const {weather, loading, addToFavorite, recentItems, setRecentItems} = useGlobalContext();
    const iconurl =
    "http://openweathermap.org/img/w/" +
    `${(weather.data.cod != 404) ? weather.data.weather[0].icon : null}` +
    ".png";
    const [isCelcius, setIsCelcius] = useLocalStorageState(false, 'isCelcius');
    const tempClassCelcius = `${styles.tempBtn} ${isCelcius ? styles.celcius : undefined}`;
    const tempClassFah = `${styles.tempBtn} ${!isCelcius ? styles.celcius : undefined}`;
    // console.log(weather);

    const removeFromFavorite = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, isFavorite: false};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    }

    const isFavorite = (cityName) => {
        if(weather.data !== '') {
            const favItem = recentItems.find((item) => item.city === cityName);
            if(favItem) {
                if(favItem.isFavorite) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        {weather.data.cod !== '404' ? <div className={styles.WeatherData }>
            <div className={styles.city}>{`${weather.data.name}, ${weather.data.sys.country}`}</div>
            {!isFavorite(weather.data.name) ? <div className={styles.favorite}>
                <button className={styles.favoriteButton} onClick={() => addToFavorite(weather.data.name)}>
                    <FaRegHeart/>
                </button>
                <span>Add to favourite</span>
            </div> :
            <div className={styles.favorite}>
                <div className={styles.favoriteIcon} >
                    <button className={styles.favoriteButton} onClick={() => removeFromFavorite(weather.data.name)}>
                        <FaHeart/>
                    </button>
                    <span >Added to favourite</span>
                </div>
            </div>
            }
            <div className={styles.temperature}>
                <div className={styles.icon}><img src={iconurl} alt='sunny'/></div>
                <div className={styles.temp}>
                    {!isCelcius ? Math.round(weather.data.main.temp) : Math.round(((weather.data.main.temp) - 32) / 1.8)}&#176;
                    <button className={tempClassCelcius} onClick={() => setIsCelcius(true)}>&#176;C</button>
                    <button className={tempClassFah} onClick={() => setIsCelcius(false)}>&#176;F</button>
                </div>
                <div className={styles.weather}>{weather.data.weather[0].description}</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.tempDetails}>
                <div className={styles.minMax}>
                    <div className={styles.minMaxIcon}><FaThermometerThreeQuarters/></div>
                    <div className={styles.minMaxText}>Min-Max 
                    <span>{!isCelcius ? Math.round(weather.data.main.temp_max) : Math.round(((weather.data.main.temp_max) - 32) / 1.8)}&#176;
                    - {!isCelcius ? Math.round(weather.data.main.temp_min) : Math.round(((weather.data.main.temp_min) - 32) / 1.8)}&#176;
                    </span></div>
                </div>
                <div className={styles.precipitation}>
                <div className={styles.precipitationIcon}><FaCloudShowersHeavy/></div>
                    <div className={styles.precipitationText}>Precipitation <span>{weather.data.rain ? weather.data.rain['1h'] + ' mm' : '0%'}</span></div>
                </div>
                <div className={styles.humidity}>
                <div className={styles.humidityIcon}><BsDroplet/></div>
                    <div className={styles.humidityText}>Humidity <span>{weather.data.main.humidity}%</span></div>
                </div>
                <div className={styles.wind}>
                <div className={styles.windIcon}><FaWind/></div>
                    <div className={styles.windText}>Wind <span>{weather.data.wind.speed} mph</span></div>
                </div>
                <div className={styles.visibility}>
                <div className={styles.visibilityIcon}><MdVisibility/></div>
                    <div className={styles.visibilityText}>Visibility <span>{Math.round(weather.data.visibility)} mph</span></div>
                </div>
            </div>
        </div> :
        <h2>Failed to fetch the weather details of requested city</h2>
        }
        </>
    );
};


WeatherData.propTypes = {

};

export default WeatherData;