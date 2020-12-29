import React from 'react';
import styles from './FavouriteItem.module.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {useGlobalContext} from '../context';
import { Link } from 'react-router-dom';

const api = {
    key: 'eba3ee12c3c0d28e4314be09645d4d8b',
    url: 'https://api.openweathermap.org/data/2.5/weather?'
};

const FavouriteItem = ({city, country, icon, temp, info, isFavorite}) => {
    const {fetchWeatherData, searchTerm, setSearchTerm, setSelectedNavItem} = useGlobalContext();
    const iconurl =
    "http://openweathermap.org/img/w/" +
    `${icon}` +
    ".png";

    const redirectToHome = async (e) => {
        await setSearchTerm(city);
        console.log(searchTerm);
        fetchWeatherData(e, city);
    }

    return (
        <Link to='/' className={styles.link} onClick={(e) => {
            setSelectedNavItem(0);
            redirectToHome(e);
        }}>
            <span className={styles.FavouriteItem }>
                <div className={styles.cityName}>{`${city}, ${country}`}</div>
                <div className={styles.tempData}>
                    <div className={styles.image}><img src={iconurl} alt='sunny'/></div>
                    <div className={styles.tempValue}>{temp}<span>&#176;C</span></div>
                    <div className={styles.tempInfo}>{info}</div>
                </div>
                <div className={styles.favIcon}>
                    {isFavorite ?
                        <div className={styles.fav}><FaHeart/></div> :
                        <div className={styles.notFav}><FaRegHeart/></div>
                    }
                </div>
            </span>
        </Link>
    );
};

export default FavouriteItem;
