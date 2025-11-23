import { handleFetch } from '../../serviceFuncs/handleFetch';
import { Meal, Restaurant, RestaurantsService } from './restaurantsService';

export class RestaurantsServiceReal implements RestaurantsService {
    private _restaurantsCache: Restaurant[] | null = null;

    async getRestaurants(): Promise<{ data: Restaurant[] }> {
        if (this._restaurantsCache !== null) {
            return {
                data: this._restaurantsCache,
            };
        }
        const responseData = await handleFetch('api/restaurant/');
        this._restaurantsCache = responseData.data;
        return responseData;
    }

    async getRestaurantById(id: string): Promise<{ data: Restaurant }> {
        if (this._restaurantsCache !== null) {
            const restaurant = this._restaurantsCache.find((r) => r.id === id);
            if (restaurant) {
                return {
                    data: restaurant,
                };
            }
        }
        const restaurant = await handleFetch(`api/restaurant/${id}/`);
        return {
            data: restaurant.data,
        };
    }

    async getMeals(restaurantId: string): Promise<{ data: Meal[] }> {
        return handleFetch(`api/restaurant/${restaurantId}/meals/`);
    }
}
