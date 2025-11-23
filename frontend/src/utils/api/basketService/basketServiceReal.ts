import { BasketService, Basket } from './basketService';
import { Feature } from '../restaurantsService/restaurantsService';
import { handleFetch } from '../../serviceFuncs/handleFetch';
import { OrderState } from '../orderService/orderService';

export class BasketServiceReal implements BasketService {
    async getBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket/');
    }
    async addMeal(restaurant_id: string, meal_id: string, feature_id: Feature[] | never[]): Promise<{ data: Basket }> {
        return handleFetch('api/basket/add_meal', { method: 'POST', data: { restaurant_id, meal_id, feature_id } });
    }
    async deleteMeal(restaurant_id: string, meal_id: string, feature_id: Feature[] | never[]): Promise<{ data: Basket }> {
        return handleFetch('api/basket/delete_meal', { method: 'POST', data: { restaurant_id, meal_id, feature_id } });
    }
    async emptyBasket(): Promise<{ data: Basket }> {
        return handleFetch('api/basket/empty', { method: 'POST' });
    }
    async placeOrder(userId: string, restaurantId: string): Promise<OrderState> {
        return handleFetch('api/orders', { method: 'POST', data: { restaurantId, userId } });
    }
}
