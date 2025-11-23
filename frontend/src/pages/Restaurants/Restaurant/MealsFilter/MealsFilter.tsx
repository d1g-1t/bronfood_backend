import { useTranslation } from 'react-i18next';
import styles from './MealsFilter.module.scss';
import { MealType } from '../../../../utils/api/restaurantsService/restaurantsService';
import ChipWithIcon from './ChipWithIcon/ChipWithIcon';
import { mealTypes as types } from '../../../../utils/consts';

type MealsFilterProps = {
    selectedTypes: MealType[];
    addType: (type: MealType) => void;
    deleteType: (type: MealType) => void;
};

function MealsFilter({ selectedTypes, addType, deleteType }: MealsFilterProps) {
    const { t } = useTranslation();
    return (
        <ul className={`${styles.meals_filter}`}>
            {types.map((type, index) => {
                const isActive = selectedTypes.includes(type);
                return (
                    <li key={`${type}-${index}`}>
                        <ChipWithIcon text={t(`pages.restaurant.${type}`)} icon={type} isActive={isActive} add={() => addType(type)} delete={() => deleteType(type)} />
                    </li>
                );
            })}
        </ul>
    );
}

export default MealsFilter;
