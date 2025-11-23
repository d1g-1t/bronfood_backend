import { useTranslation } from 'react-i18next';
import styles from './MealTotal.module.scss';
import Button from '../../../components/Button/Button';

function MealTotal({ price, buttonDisabled }: { price: number; buttonDisabled: boolean }) {
    const { t } = useTranslation();
    return (
        <div className={styles.meal_total}>
            <div className={styles.meal_total__title}>
                <p className={styles.meal_total__text}>{t(`pages.meal.fee`)}</p>
                <span className={styles.meal_total__price}>{`130 ₸`}</span>
            </div>
            <div className={styles.meal_total__title}>
                <p className={styles.meal_total__text}>{t(`pages.meal.total`)}</p>
                <span className={styles.meal_total__price}>{`${price} ₸`}</span>
            </div>
            <div className={styles.meal_total__button}>
                <Button type="submit" disabled={buttonDisabled}>
                    {t(`pages.meal.add`)}
                </Button>
            </div>
        </div>
    );
}

export default MealTotal;
