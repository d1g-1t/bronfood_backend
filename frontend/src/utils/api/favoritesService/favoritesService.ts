import { Restaurant } from '../restaurantsService/restaurantsService';
import { FavoritesServiceMock } from './favoritesServiceMock';
export interface FavoritesService {
    getFavorites: (userId: string) => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
    setFavorites: (restId: string) => Promise<{ status: 'success'; data: Restaurant[] } | { status: 'error'; error_message: string }>;
    deleteFavorites: (restId: string) => Promise<{ status: 'success'; data: Restaurant[] | null } | { status: 'error'; error_message: string }>;
}

export const favoritesService = new FavoritesServiceMock();
