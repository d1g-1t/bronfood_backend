import { FC, ReactNode, useEffect } from 'react';
import styles from './Popup.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

interface Popup {
    /**
     * Main popup title
     */
    title?: string;
    /**
     * Choose type of popup: info
     */
    mode?: 'info';
    /**
     * Flag that sets whether or not to show the back button
     */
    arrowBack?: boolean;
    /**
     * Route that corresponds to the previous page
     */
    previousPageRoute?: string;
    /**
     * Handle close popup
     */
    onClose: () => void;
    /**
     * Elements that popup contains
     */
    children: ReactNode;
}

const Popup: FC<Popup> = (props) => {
    const navigate = useNavigate();

    const arrowBackClick = () => {
        props.previousPageRoute ? navigate(props.previousPageRoute) : navigate(-1);
    };

    const handleCloseButton = () => {
        props.onClose();
    };

    const { onClose } = props;
    useEsc(() => onClose(), [onClose]);

    useEffect(() => {
        const overlayElement = document.getElementById('popup-overlay');
        const handleMouseDown = (e: Event) => {
            e.target === e.currentTarget && onClose();
        };
        overlayElement?.addEventListener('mousedown', handleMouseDown);
        return () => overlayElement?.removeEventListener('mousedown', handleMouseDown);
    }, [onClose]);

    return (
        <div id={'popup-overlay'} className={styles.popup_overlay}>
            <div className={`${styles.popup} ${styles[`popup_${props.mode}`]}`}>
                {props.title && <h2 className={`${styles.popup__title} ${styles[`popup__title_${props.mode}`]}`}>{props.title}</h2>}
                {props.children}
                {props.arrowBack && <button className={`${styles['popup__arrow-back']} button`} type="button" onClick={arrowBackClick} />}
                <button className={`${styles.popup__close} ${styles[`popup__close_${props.mode}`]} button`} type="button" onClick={handleCloseButton}></button>
            </div>
        </div>
    );
};

export default Popup;
