import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useCurrentUser } from '../../../../utils/hooks/useCurrentUser/useCurretUser';
import { useRestaurants } from '../../../../utils/hooks/useRestaurants/useRestaurants';
import { useBasketMutations } from '../../../../utils/hooks/useBasket/useBasket';
import { useQueryClient } from '@tanstack/react-query';
import { Basket } from '../../../../utils/api/basketService/basketService';

function BoxFood({ card, setIsMealPageOpen }: { card: Meal; setIsMealPageOpen: Dispatch<SetStateAction<boolean>> }) {
    const { id, features } = card;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { restaurant } = useRestaurants();
    const { addMeal, emptyBasket } = useBasketMutations();
    const hasFeatures = features && features.length > 0;
    const { isLogin } = useCurrentUser();
    const queryClient = useQueryClient();
    const basket: undefined | { data: Basket } = queryClient.getQueryData(['basket']);
    const handleClick = () => {
        if (isLogin && restaurant) {
            if (hasFeatures) {
                navigate(`${pathname}/meal/${id}`);
                setIsMealPageOpen(true);
            } else if (restaurant.id === basket?.data.restaurant.id) {
                addMeal.mutateAsync({ restaurantId: restaurant.id, mealId: id, features: features || [] });
            } else if (restaurant) {
                emptyBasket.mutateAsync();
                addMeal.mutateAsync({ restaurantId: restaurant.id, mealId: id, features: features || [] });
            }
        } else {
            navigate(`/signin`);
        }
    };
    return (
        <div className={`${styles.boxfood}`} onClick={handleClick}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button type="button" icon="add" isActive={addMeal.isPending} disabled={addMeal.isPending} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;
