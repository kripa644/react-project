import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchItem.module.css';
import logo from './logo.png';
import { BiSearchAlt2 } from 'react-icons/bi';
import {useGlobalContext} from '../context';
import { Link } from 'react-router-dom';

const SearchItem = props => {
    const {searchTerm, setSearchTerm, fetchWeatherData, setWeather,  weather} = useGlobalContext();

    return (
        <div className={styles.navContainer}>
            <div className={styles.SearchItem }>
                <img className={styles.logo} src={logo} alt='logo'/>
                <div className={styles.searchField}>
                    <form onSubmit={fetchWeatherData}>
                        <input className={styles.searchCity}
                        type='text' 
                        name='searchCity' 
                        id='searchCity' 
                        placeholder='Search City'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setWeather({data: ''});
                            // fetchWeatherData();
                        }}
                        // onKeyPress={fetchWeatherData}
                        >
                        </input>
                        <button className={styles.searchIcon} onClick={fetchWeatherData}><BiSearchAlt2/></button>
                    </form>
                </div>
            </div>
        </div>
    );
};


SearchItem.propTypes = {

};

export default SearchItem;