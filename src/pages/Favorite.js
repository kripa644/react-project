import React, {useState} from 'react';
import {useGlobalContext} from '../components/context';
import icon from './icon_nothing.png';
import './pages.css';
import Modal from '../components/Modal/Modal';
import FavouriteItem from '../components/FavouriteItem/FavouriteItem';

const api = {
    key: 'eba3ee12c3c0d28e4314be09645d4d8b',
    url: 'https://api.openweathermap.org/data/2.5/weather?'
};

const Favorites = () => {
  const {recentItems, setRecentItems} = useGlobalContext();
  const [show, setShow] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const closeModal = () => {
    setShow(false);
  }

  const favoriteItems = recentItems.filter((item) => item.isFavorite);
  // setFavorites(favoriteItems);
  // if(favoriteItems) {
  //   setFavorites(favoriteItems);
  // } else {
  //   setFavorites([]);
  // }

  const fetchweather = async (item) => {
    const data = await fetch(`${api.url}q=${item.city}&units=imperial&appid=${api.key}`
            ).then((res) => res.json())
            .then(data => data);
    const newItem = {city: data.name, 
                country: item.country,
                icon: data.weather[0].icon, 
                temp: Math.round((data.main.temp - 32) / 1.8), 
                info: data.weather[0].description, 
                isFavorite: false,
                isRecent: true};
    setFavorites(favorites.concat(newItem));
  }

  const remove = () => {
    const newFavItems = recentItems.map((item) => {
      return {...item, isFavorite: false};
    });
    setRecentItems(newFavItems);
    // setFavorites([]);
  }

  return (
    <div className='favourite'>
      {favoriteItems.length !== 0 ? 
      <div className='favoriteCities'>
        <div className='favoriteHeader'>
          <div className='favTitle'>
            {favoriteItems.length} City added as favorite
          </div>
          <button className='remove' onClick={() => setShow(true)}>Remove All</button>
        </div>
        <div className='favouriteItems'>
          {favoriteItems.map((item, index) => {
            {/* fetchweather(item);
            const newItem = favorites.find((element) => element.city === item.city);
            if(newItem !== null) {
              return <FavouriteItem key={index} {...newItem}/>
            } */}
            return <FavouriteItem key={index} {...item}/>
          })}
        </div>
        {show && <Modal show={show} closeModal={closeModal} remove={remove}>
          <div className='modalText'>
            Are you sure want to remove all the favourites?
          </div>
        </Modal>}
      </div> : 
      <div className='noFavorite'>
        <img src={icon} alt='No Favorites'/>
        <div className='noFavoriteText'>No Favourites Added</div>
      </div>
      }
    </div>
  );
}

export default Favorites;