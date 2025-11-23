import styles from './RestaurantCardLarge.module.scss';
import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';
import { useFavoritesMutations } from '../../../utils/hooks/useFavorites/useFavorites';

type RestaurantCardLargeProps = {
    card: Restaurant;
    isFavorite?: boolean;
    onRestaurantClick: () => void;
};

function RestaurantCardLarge({ card, isFavorite = false, onRestaurantClick }: RestaurantCardLargeProps) {
    const { deleteFavorite } = useFavoritesMutations();
    const handleDeleteFavorite = (id: string) => deleteFavorite.mutate(id);

    return (
        <div className={styles.card} onClick={onRestaurantClick}>
            <div className={styles.card__container}>
                {isFavorite ? <div className={styles.card__delete} onClick={() => handleDeleteFavorite(card.id)}></div> : ''}
                <div className={styles.card__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.card__description}>
                    <div className={styles.card__title_container}>
                        <p className={styles.card__title}>{card.name}</p>
                        <p className={styles.card__rating}>{card.rating}</p>
                        <div className={`${styles.card__icon} ${styles.card__icon_star} ${styles.card__icon_large}`} />
                    </div>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_placemark} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCardLarge;
