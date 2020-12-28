import React from 'react';
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css';
import {useGlobalContext} from '../context';

const NavBar = props => {
    const {selectedNavItem, setSelectedNavItem} = useGlobalContext();
    
    const displayTime = () => {
        var d = new Date(),
        minutes = d.getMinutes().toString().length === 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length === 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'PM' : 'AM',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+'    '+hours+':'+minutes+ampm;
    };

    const navItemClass1 = `${styles.navItem} ${selectedNavItem === 0 ? styles.show : undefined}`;
    const navItemClass2 = `${styles.navItem} ${selectedNavItem === 1 ? styles.show : undefined}`;
    const navItemClass3 = `${styles.navItem} ${selectedNavItem === 2 ? styles.show : undefined}`;
    console.log(selectedNavItem);
    return (
        <div className={styles.navContainer}>
            
            <nav className={styles.navbar}>
                <div className={styles.navCenter}>
                    <ul className={styles.navLinks}>
                    <li>
                        <Link to='/' className={navItemClass1} onClick={() => {
                            setSelectedNavItem(0);
                            console.log(selectedNavItem);
                        }}>Home</Link>
                    </li>
                    <li>
                        <Link to='favorites' className={navItemClass2} onClick={() => setSelectedNavItem(1)}>Favourite</Link>
                    </li>
                    <li>
                        <Link to='/recent' className={navItemClass3} onClick={() => setSelectedNavItem(2)}>Recent Search</Link>
                    </li>
                    </ul>
                </div>
            </nav>

            <div className={styles.date}>{displayTime()}</div>
        </div>
    );
};


NavBar.propTypes = {

};

export default NavBar;