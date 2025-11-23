import styles from './MealImage.module.scss';

function MealImage({ image }: { image: string }) {
    return (
        <div className={styles.meal_image_container}>
            <div className={styles.meal_image} style={{ backgroundImage: `url(${image})` }} />
        </div>
    );
}

export default MealImage;
