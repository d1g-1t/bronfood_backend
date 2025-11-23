import styles from './RestaurantDescription.module.scss';

type RestaurantDescriptionProps = {
    name: string;
    address: string;
    workingTime: string;
    rating: number;
    reviews: string;
};

function RestaurantDescription({ name, address, workingTime, rating, reviews }: RestaurantDescriptionProps) {
    return (
        <div className={styles.restaurant_description}>
            <h1 className={styles.restaurant_description__name}>{name}</h1>
            <div className={styles.restaurant_description__features}>
                <div className={styles.restaurant_description__feature}>
                    <div className={`${styles.restaurant_description__icon} ${styles.restaurant_description__icon_placemark} ${styles.restaurant_description__icon_small}`} />
                    <p className={styles.restaurant_description__feature_title}>{address}</p>
                </div>
                <div className={styles.restaurant_description__feature}>
                    <div className={`${styles.restaurant_description__icon} ${styles.restaurant_description__icon_clock} ${styles.restaurant_description__icon_small}`} />
                    <p className={styles.restaurant_description__feature_title}>{workingTime}</p>
                </div>
            </div>
            <div className={styles.restaurant_description__rating_container}>
                <span className={styles.restaurant_description__rating}>{rating}</span>
                <div className={`${styles.restaurant_description__icon} ${styles.restaurant_description__icon_star} ${styles.restaurant_description__icon_large}`} />
                <span className={styles.restaurant_description__reviews}>{reviews}</span>
            </div>
        </div>
    );
}

export default RestaurantDescription;
