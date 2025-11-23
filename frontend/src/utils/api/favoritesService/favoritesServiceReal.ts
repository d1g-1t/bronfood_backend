import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesService } from './favoritesService';
import { handleFetch } from '../../serviceFuncs/handleFetch';

export class FavoritesServiceReal implements FavoritesService {
    async getFavorites(): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch('api/favorites');
    }

    async setFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/favorites/${restId}`, { method: 'PUT' });
    }

    async deleteFavorites(restId: string): Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }> {
        return handleFetch(`api/favorites/${restId}`, { method: 'DELETE' });
    }
}
