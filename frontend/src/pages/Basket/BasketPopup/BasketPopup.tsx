import { MouseEvent, ReactNode } from 'react';
import styles from './BasketPopup.module.scss';
import Button from '../../../components/ButtonIconSquare/ButtonIconSquare';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

type BasketPopupProps = {
    close: () => void;
    isConfirmationPopupOpen: boolean;
    children?: ReactNode;
};

const BasketPopup = ({ close, isConfirmationPopupOpen, children }: BasketPopupProps) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => !isConfirmationPopupOpen && close(), [isConfirmationPopupOpen, close]);
    return (
        <div className={styles.basket_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.basket_popup}>
                <div className={`${styles.basket_popup_button} ${styles.basket_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default BasketPopup;
