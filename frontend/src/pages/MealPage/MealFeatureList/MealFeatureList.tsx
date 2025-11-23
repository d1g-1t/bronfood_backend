import { useFormContext } from 'react-hook-form';
import styles from './MealFeatureList.module.scss';
import { Choice as ChoiceType, Feature } from '../../../utils/api/restaurantsService/restaurantsService';

const MealFeatureList = ({ features }: { features: Feature[] | [] }) => {
    return (
        <ul className={`${styles.feature_list} bronfood-scrollbar`}>
            {features.map((feature) => (
                <li key={feature.id}>
                    <MealFeature feature={feature} />
                </li>
            ))}
        </ul>
    );
};

function MealFeature({ feature }: { feature: Feature }) {
    const { name, choices } = feature;
    return (
        <div className={styles.feature}>
            <p className={styles.feature__name}>{name}</p>
            <ChoiceList featureName={name} choices={choices} />
        </div>
    );
}

function ChoiceList({ featureName, choices }: { featureName: string; choices: ChoiceType[] }) {
    return (
        <fieldset name={featureName} className={styles.choice_list}>
            {choices.map((choice) => (
                <Choice key={choice.id} featureName={featureName} choice={choice} />
            ))}
        </fieldset>
    );
}

function Choice({ featureName, choice }: { featureName: string; choice: ChoiceType }) {
    const { register } = useFormContext();
    return (
        <div className={styles.choice}>
            <label className={styles.choice__container}>
                <input type="radio" value={choice.name} defaultChecked={choice.default} className={styles.radioButton} {...register(featureName)} />
                <span className={styles.choice__name}>{choice.name}</span>
                <span className={styles.choice__price}>{`${choice.price.toFixed(0)} ₸`}</span>
            </label>
        </div>
    );
}

export default MealFeatureList;
