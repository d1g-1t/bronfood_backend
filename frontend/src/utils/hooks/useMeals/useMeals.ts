import { useQuery } from '@tanstack/react-query';
import { restaurantsService } from '../../api/restaurantsService/restaurantsService';

export const useMeals = (restaurantId: string) => {
    return useQuery({
        queryKey: ['meals', restaurantId],
        queryFn: () => restaurantsService.getMeals(restaurantId),
    });
};
