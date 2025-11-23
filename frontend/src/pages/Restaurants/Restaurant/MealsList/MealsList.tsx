import { Dispatch, SetStateAction } from 'react';
import styles from './MealsList.module.scss';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import BoxFood from '../BoxFood/BoxFood';

const MealsList = ({ meals, setIsMealPageOpen }: { meals: Meal[]; setIsMealPageOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <ul className={`${styles.meals_list} bronfood-scrollbar ${meals.length === 1 ? styles.meals_list_short : ''}`}>
            {meals.map((meal, index) => (
                <li key={`${meal}-${index}`}>
                    <BoxFood card={meal} setIsMealPageOpen={setIsMealPageOpen} />
                </li>
            ))}
        </ul>
    );
};

export default MealsList;
