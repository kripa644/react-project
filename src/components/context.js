import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const api = {
    key: 'eba3ee12c3c0d28e4314be09645d4d8b',
    url: 'https://api.openweathermap.org/data/2.5/weather?'
};

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${api.key}`;

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [selectedNavItem, setSelectedNavItem] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [weather, setWeather] = useState({data: ''});
    const [loading, setLoading] = useState(false);
    const [recentItems, setRecentItems] = useState([]);

    const addToFavorite = (cityName) => {
        const newRecentList = recentItems.map((item) => {
            if(item.city === cityName) {
                const newItem = {...item, isFavorite: true};
                return newItem;
            }
            return item;
        });
        setRecentItems(newRecentList);
    
    }

    const fetchWeatherData = async (e, city) => {
            e.preventDefault();
            // setWeather({data: ''});
            setLoading(true);
            setSearchTerm(city);
            const searchValue = city || searchTerm;
            const data = await fetch(`${api.url}q=${searchValue}&units=imperial&appid=${api.key}`
            ).then((res) => res.json())
            .then(data => data);
            // console.log(data);
            setWeather({data: data});
            setSearchTerm('');
            setLoading(false);
            console.log(data);
        
            const element = recentItems.find((item) => item.city === data.name);
            if(element) {
                // setRecentItems(recentItems.concat({...element, isRecent: true}));
                // return;
                const newRecentItems = recentItems.map((item) => {
                    if(item.city === data.name) {
                        return {...item, isRecent: true};
                    }
                    return item;
                });
                setRecentItems(newRecentItems);
                return;
            }
            if(data.cod !== '404') {
                const newData = {city: data.name,
                                country: data.sys.country, 
                                icon: data.weather[0].icon, 
                                temp: Math.round((data.main.temp - 32) / 1.8), 
                                info: data.weather[0].description, 
                                isFavorite: false,
                                isRecent: true
                                };
                setRecentItems(recentItems.concat(newData));
            }

        };
  


    return <AppContext.Provider 
            value={{
                searchTerm,
                fetchWeatherData,
                setSearchTerm,
                loading,
                weather,
                setWeather,
                selectedNavItem,
                setSelectedNavItem,
                addToFavorite,
                recentItems,
                setRecentItems
            }}
          >
            {children}
          </AppContext.Provider>
};


export const useGlobalContext = () => {
    return useContext(AppContext);
}
  
export { AppContext, AppProvider }