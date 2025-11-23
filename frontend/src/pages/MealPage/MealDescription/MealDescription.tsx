import styles from './MealDescription.module.scss';

type MealDescriptionProps = {
    name: string;
    description: string;
};

function MealDescription({ name, description }: MealDescriptionProps) {
    return (
        <div className={styles.meal_description}>
            <h1 className={styles.meal_description__name}>{name}</h1>
            <p className={styles.meal_description__text}>{description}</p>
        </div>
    );
}

export default MealDescription;
