import { mockRestaurants } from '../../../pages/Restaurants/MockRestaurantsList';
import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';

export const mockUser: { favorites: Restaurant[] } = {
    favorites: [],
};

export class FavoritesServiceMock implements FavoritesService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    async getFavorites(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(1000);
        const token = true;
        if (!token) {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }

    async setFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            const rest: Restaurant | undefined = mockRestaurants.find((rest) => restId === rest.id);
            if (rest) {
                rest.isLiked = true;
                mockUser.favorites.push(rest);
            }
        } else {
            throw new Error('Ресторан не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }

    async deleteFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[] | null } | { status: 'error'; error_message: string }> {
        await this._wait(100);
        const token = true;
        if (token) {
            const rest = mockRestaurants.find((rest) => restId === rest.id);
            if (rest) {
                const newFavorites: Restaurant[] = mockUser.favorites.filter((rest) => rest.id !== restId) ?? null;
                rest.isLiked = false;
                mockUser.favorites = newFavorites;
            }
        } else {
            throw new Error('Пользователь не найден');
        }
        return { status: 'success', data: mockUser.favorites };
    }
}
