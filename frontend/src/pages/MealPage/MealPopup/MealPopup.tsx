import { MouseEvent, ReactNode } from 'react';
import styles from './MealPopup.module.scss';
import Button from '../../../components/ButtonIconRound/ButtonIconRound';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

type MealPopupProps = {
    goBack: () => void;
    close: () => void;
    children?: ReactNode;
};

const MealPopup = ({ goBack, close, children }: MealPopupProps) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => goBack(), [goBack]);
    return (
        <div className={styles.meal_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.meal_popup}>
                <div className={`${styles.meal_popup_button} ${styles.meal_popup_button_back}`}>
                    <Button type="button" onClick={goBack} icon="back" />
                </div>
                <div className={`${styles.meal_popup_button} ${styles.meal_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default MealPopup;
