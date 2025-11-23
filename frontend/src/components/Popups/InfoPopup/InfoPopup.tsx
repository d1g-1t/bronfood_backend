import { FC, ReactNode, useEffect } from 'react';
import styles from './InfoPopup.module.scss';
import { useNavigate } from 'react-router-dom';

interface InfoPopup {
    /**
     * Fires when info popup closes
     */
    onCloseInfoPopup?: () => void;
    /**
     * Elements that popup contains
     */
    children: ReactNode;
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Has this info window close button?
     */
    hasCloseButton?: boolean;
}

const InfoPopup: FC<InfoPopup> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutRoute = setTimeout(() => {
            navigate('/');
        }, 3000);
        return () => {
            clearTimeout(timeoutRoute);
        };
    }, [navigate]);

    return (
        <div className={`${styles.popup__overlay} ${props.isOpened ? '' : styles.popup__overlay_hide}`}>
            <div className={`${styles.popup} ${props.isOpened ? '' : styles.popup_hide}`}>
                {props.children}
                {props.hasCloseButton ? <button className={styles.popup__close} type="button" onClick={props.onCloseInfoPopup}></button> : ''}
            </div>
        </div>
    );
};

export default InfoPopup;
