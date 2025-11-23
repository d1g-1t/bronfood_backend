import styles from './BasketEmpty.module.scss';
import { useTranslation } from 'react-i18next';

function BasketEmpty() {
    const { t } = useTranslation();
    return (
        <div className={styles.basket_empty}>
            <h1 className={styles.basket_empty__name}>{t(`pages.basket.basketEmpty`)}</h1>
            <div className={styles.basket_empty__image} />
        </div>
    );
}

export default BasketEmpty;
