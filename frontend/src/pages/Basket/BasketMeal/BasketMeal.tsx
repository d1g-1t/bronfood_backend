import { sumBy } from 'lodash';
import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import { useBasketMutations } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ mealInBasket, restaurantId }: { mealInBasket: MealInBasket; restaurantId: string }) {
    const { meal, count } = mealInBasket;
    const { id, name, photo, price, features = [] } = meal;
    const mealPrice =
        features.length > 0
            ? sumBy(features, (feature) => {
                  const chosenChoice = feature.choices.find((choice) => choice.chosen);
                  const defaultChoice = feature.choices.find((choice) => choice.default);
                  if (chosenChoice) {
                      return chosenChoice.price;
                  } else if (defaultChoice) {
                      return defaultChoice.price;
                  }
                  return 0;
              })
            : price;
    const featureName = 'Размер';
    const toppings = features.filter((feature) => feature.name !== featureName);
    const sizeFeature = features.find((feature) => feature.name === featureName);
    const size = sizeFeature ? sizeFeature.choices.find((choice) => choice.chosen)?.name : null;
    const { addMeal, deleteMeal } = useBasketMutations();
    return (
        <div className={`${styles.basket_meal}`}>
            <div className={styles.basket_meal__container}>
                <div className={styles.basket_meal__image} style={{ backgroundImage: `url(${photo})` }} />
                <div className={styles.basket_meal__description}>
                    <p className={styles.basket_meal__name}>{name}</p>
                    <ul>
                        {toppings.map((feature) => {
                            const choice = feature.choices.find((choice) => choice.chosen);
                            if (choice) {
                                return (
                                    <li key={feature.id}>
                                        <p className={styles.basket_meal__feature}>{choice.name}</p>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <div className={styles.basket_meal__price_container}>
                        {size && <p className={styles.basket_meal__size}>{size}</p>}
                        <span className={styles.basket_meal__price}>{`${mealPrice.toFixed(0)} ₸`}</span>
                    </div>
                </div>
                <div className={styles.basket_meal__counter}>
                    <Counter count={count} increment={() => addMeal.mutateAsync({ restaurantId, mealId: id, features })} decrement={() => deleteMeal.mutateAsync({ restaurantId, mealId: id, features })} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;
