import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import MealPopup from './MealPopup/MealPopup';
import MealImage from './MealImage/MealImage';
import MealDescription from './MealDescription/MealDescription';
import MealTotal from './MealTotal/MealTotal';
import MealFeatureList from './MealFeatureList/MealFeatureList';
import Preloader from '../../components/Preloader/Preloader';
import { Feature, Meal } from '../../utils/api/restaurantsService/restaurantsService';
import { Basket } from '../../utils/api/basketService/basketService';
import { sumBy } from 'lodash';
import { useMeals } from '../../utils/hooks/useMeals/useMeals';
import { useBasketMutations } from '../../utils/hooks/useBasket/useBasket';

function MealPage() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const navigate = useNavigate();
    const { restaurantId = '', mealId = '' } = useParams();
    const { addMeal, emptyBasket } = useBasketMutations();
    const methods = useForm();
    const { watch } = methods;
    const { data, isSuccess } = useMeals(restaurantId);
    const meals = isSuccess && data.data;
    const meal: Meal | undefined | false = meals && meals.find((meal) => meal.id == mealId);
    const price = sumBy(features, (feature) => {
        const isChosen = feature.choices.some((choice) => choice.chosen);
        if (isChosen) {
            return feature.choices.filter((choice) => choice.chosen)[0].price;
        } else {
            return feature.choices.filter((choice) => choice.default)[0].price;
        }
    });
    const queryClient = useQueryClient();
    const basket: undefined | { data: Basket } = queryClient.getQueryData(['basket']);
    const goBack = () => {
        navigate(`/restaurants/${restaurantId}`);
    };
    const close = () => {
        navigate('/restaurants');
    };
    useEffect(() => {
        const formValues = watch((value, { name }) => {
            const nextFeatures = features.map((feature: Feature) => {
                if (feature.name === name) {
                    const choices = feature.choices.map((choice) => {
                        return { ...choice, chosen: choice.name === value[name] };
                    });
                    return { ...feature, choices };
                } else return feature;
            });
            setFeatures(nextFeatures);
        });
        return () => formValues.unsubscribe();
    }, [watch, features]);

    useEffect(() => {
        if (meal && meal?.features) {
            setFeatures(meal.features);
        } else {
            setFeatures([]);
        }
    }, [meal]);

    if (meal && features.length > 0) {
        const onSubmit: SubmitHandler<FieldValues> = async () => {
            const newFeatures = features.map((feature: Feature) => {
                const choiceChosen = feature.choices.filter((choice) => choice.chosen)[0];
                if (choiceChosen) {
                    return feature;
                } else {
                    const choices = feature.choices.map((choice) => ({ ...choice, chosen: choice.default }));
                    return { ...feature, choices };
                }
            });
            if (restaurantId === basket?.data.restaurant.id) {
                addMeal.mutateAsync({ restaurantId, mealId: meal.id, features: newFeatures });
                goBack();
            } else {
                emptyBasket.mutateAsync();
                addMeal.mutateAsync({ restaurantId, mealId: meal.id, features: newFeatures });
                goBack();
            }
        };
        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MealPopup goBack={goBack} close={close}>
                        <MealImage image={meal.photo} />
                        <MealDescription name={meal.name} description={meal.description} />
                        <MealFeatureList features={features} />
                        <MealTotal price={price} buttonDisabled={addMeal.isPending} />
                        {addMeal.isPending && <Preloader />}
                    </MealPopup>
                </form>
            </FormProvider>
        );
    } else return null;
}

export default MealPage;
