import React, {useState} from 'react';
import styles from './Modal.module.css';

const Modal = ({show, closeModal, remove, children}) => {

    return (
        <>
            {show && <div className={styles.modalContent}>
                <div>
                    {children}
                    <div className={styles.buttons}>
                        <button className={styles.no} onClick={closeModal}>
                            NO
                        </button>
                        <button className={styles.yes} onClick={() => {
                            remove();
                            closeModal();
                        }}>
                            YES
                        </button>
                    </div>
                </div>
            </div>}
        </>
    );
};


export default Modal;