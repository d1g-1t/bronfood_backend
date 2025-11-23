import styles from './BasketDescription.module.scss';
import { useTranslation } from 'react-i18next';

type BasketDescriptionProps = {
    waitingTime: number;
    children: React.ReactNode;
};

function BasketDescription({ waitingTime, children }: BasketDescriptionProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.basket}>
            <h1 className={styles.basket__name}>{t(`pages.basket.basket`)}</h1>
            {children}
            <div className={styles.basket__cooking_time}>
                <p className={styles.basket__cooking_time__text}>{t(`pages.basket.waitingTime`)}</p>
                <div className={styles.basket__cooking_time__icon} />
                <span className={styles.basket__cooking_time__minutes}>{`${waitingTime} ${t(`pages.basket.min`)}`}</span>
            </div>
        </div>
    );
}

export default BasketDescription;
