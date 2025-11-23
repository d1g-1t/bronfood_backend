import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { basketService } from '../../api/basketService/basketService';
import { Feature } from '../../api/restaurantsService/restaurantsService';
import { useCurrentUser } from '../useCurrentUser/useCurretUser';

export const useGetBasket = () => {
    const { isLogin } = useCurrentUser();
    return useQuery({
        queryKey: ['basket'],
        queryFn: () => basketService.getBasket(),
        enabled: isLogin,
    });
};

export const useBasketMutations = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();
    const addMeal = useMutation({
        mutationFn: ({ restaurantId, mealId, features }: { restaurantId: string; mealId: string; features: Feature[] }) => basketService.addMeal(restaurantId, mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const deleteMeal = useMutation({
        mutationFn: ({ restaurantId, mealId, features }: { restaurantId: string; mealId: string; features: Feature[] }) => basketService.deleteMeal(restaurantId, mealId, features),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const emptyBasket = useMutation({
        mutationFn: () => basketService.emptyBasket(),
        onSuccess: (result) => queryClient.setQueryData(['basket'], result),
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    const reset = () => {
        setErrorMessage('');
        addMeal.reset();
        deleteMeal.reset();
        emptyBasket.reset();
    };
    const placeOrder = useMutation({
        mutationFn: ({ userId, restaurantId }: { userId: string; restaurantId: string }) => basketService.placeOrder(userId, restaurantId),
        onSuccess: (result) => {
            queryClient.setQueryData(['basket'], result);
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
    return {
        addMeal,
        deleteMeal,
        emptyBasket,
        errorMessage,
        reset,
        placeOrder,
    };
};
