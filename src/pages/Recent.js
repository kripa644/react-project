import React, {useState} from 'react';
import {useGlobalContext} from '../components/context';
import icon from './icon_nothing.png';
import './pages.css';
import Modal from '../components/Modal/Modal';
import FavouriteItem from '../components/FavouriteItem/FavouriteItem';

const RecentItems = () => {
  const {recentItems, setRecentItems} = useGlobalContext();
  const [show, setShow] = useState(false);

  const RecentItems = recentItems.filter((item) => item.isRecent);

  const closeModal = () => {
    setShow(false);
  };

  const remove = () => {
    const newRecentItems = recentItems.map((item) => {
      return {...item, isRecent: false};
    });
    setRecentItems(newRecentItems);
  };

  return (
    <div className='favourite'>
      {RecentItems.length !== 0 ? 
      <div className='favoriteCities'>
        <div className='favoriteHeader'>
          <div className='favTitle'>
            You recently searched for
          </div>
          <button className='remove' onClick={() => setShow(true)}>Clear All</button>
        </div>
        <div className='favouriteItems'>
          {RecentItems.map((item, index) => {
            return <FavouriteItem key={index} {...item}/>
          })}
        </div>
        {show && <Modal show={show} closeModal={closeModal} remove={remove}>
            <div className='modalText'>
                Are you sure want to remove all the Recents?
            </div>
        </Modal>}
      </div> : 
      <div className='noFavorite'>
        <img src={icon} alt='No Favorites'/>
        <div className='noFavoriteText'>No Recent Search</div>
      </div>
      }
    </div>
  );
}

export default RecentItems;