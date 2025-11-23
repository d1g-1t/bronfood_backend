import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import BasketConfirmation from './BasketConfirmation/BasketConfirmation';
import BasketDescription from './BasketDescription/BasketDescription';
import BasketEmpty from './BasketEmpty/BasketEmpty';
import BasketMealsList from './BasketMealsList/BasketMealsList';
import BasketPopup from './BasketPopup/BasketPopup';
import BasketRestaurant from './BasketRestaurant/BasketRestaurant';
import BasketTotal from './BasketTotal/BasketTotal';
import { useBasketMutations, useGetBasket } from '../../utils/hooks/useBasket/useBasket';
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';
import { MealInBasket } from '../../utils/api/basketService/basketService';
import { sumBy } from 'lodash';

function Basket() {
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addMeal, deleteMeal, emptyBasket, errorMessage, reset, placeOrder } = useBasketMutations();
    const { data, isSuccess } = useGetBasket();
    const restaurant: Restaurant | Record<string, never> = isSuccess ? data.data.restaurant : {};
    const meals: MealInBasket[] = isSuccess ? data.data.meals : [];
    const waitingTime = meals.some((meal) => meal.count > 0) ? Math.max(...meals.map(({ meal, count }) => (count > 0 ? meal.waitingTime : 0))) : 0;
    const isEmpty = Object.keys(restaurant).length === 0;
    const price = meals.reduce((acc, current) => {
        if (current.meal.features && current.meal.features.length > 0) {
            return (
                acc +
                current.count *
                    sumBy(current.meal.features, (feature) => {
                        const isChosen = feature.choices.some((choice) => choice.chosen);
                        if (isChosen) {
                            return feature.choices.filter((choice) => choice.chosen)[0].price;
                        } else {
                            return feature.choices.filter((choice) => choice.default)[0].price;
                        }
                    })
            );
        }
        return acc + current.count * current.meal.price;
    }, 0);
    const isLoading = addMeal.isPending || deleteMeal.isPending || emptyBasket.isPending;
    const { currentUser } = useCurrentUser();
    const userId = currentUser?.userId;
    const restaurantId = restaurant.id;
    const close = () => {
        reset();
        navigate(-1);
    };
    useEffect(() => {
        if (placeOrder.data) {
            const order = placeOrder.data;
            navigate('/waiting-order', { state: { order } });
        }
    }, [placeOrder, navigate]);
    const handlePayOrder = async () => {
        if (userId) {
            await placeOrder.mutate({ userId, restaurantId });
        }
    };
    return (
        <>
            <BasketPopup close={close} isConfirmationPopupOpen={isConfirmationPopupOpen}>
                {isEmpty ? (
                    <BasketEmpty />
                ) : (
                    <>
                        <BasketDescription waitingTime={waitingTime}>{restaurant && <BasketRestaurant restaurant={restaurant} emptyBasket={() => setIsConfirmationPopupOpen(true)} />}</BasketDescription>
                        {errorMessage && <ErrorMessage message={t(`pages.basket.${errorMessage}`)} />}
                        <BasketMealsList meals={meals} restaurantId={restaurantId} />
                        <BasketTotal price={price} onPayOrderClick={handlePayOrder} />
                    </>
                )}
                {isLoading && <Preloader />}
            </BasketPopup>
            {isConfirmationPopupOpen && <BasketConfirmation close={() => setIsConfirmationPopupOpen(false)} />}
        </>
    );
}

export default Basket;
