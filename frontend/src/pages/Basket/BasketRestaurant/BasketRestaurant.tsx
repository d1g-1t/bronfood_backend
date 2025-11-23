import styles from './BasketRestaurant.module.scss';
import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';
import ButtonIconSquare from '../../../components/ButtonIconSquare/ButtonIconSquare';
import { FormEvent } from 'react';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';

function BasketRestaurant({ restaurant, emptyBasket }: { restaurant: Restaurant | Record<string, never>; emptyBasket: () => void }) {
    const { restaurantsOnMap } = useRestaurants();
    const photo = restaurantsOnMap.find((res) => res.id === restaurant.id)?.photo;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emptyBasket();
    };
    return (
        <div className={styles.basket_restaurant}>
            <div className={styles.basket_restaurant__container}>
                <div className={styles.basket_restaurant__image} style={{ backgroundImage: `url(${photo})` }} />
                <div className={styles.basket_restaurant__description}>
                    <p className={styles.basket_restaurant__name}>{restaurant.name}</p>
                    <div className={styles.basket_restaurant__feature}>
                        <div className={`${styles.basket_restaurant__icon} ${styles.basket_restaurant__icon_placemark} ${styles.basket_restaurant__icon_small}`} />
                        <p className={styles.basket_restaurant__feature_title}>{restaurant.address}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <ButtonIconSquare type="submit" icon="delete" />
            </form>
        </div>
    );
}

export default BasketRestaurant;
