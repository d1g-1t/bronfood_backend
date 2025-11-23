import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '../../api/favoritesService/favoritesService';

const useGetFavorites = () => {
    return useQuery({
        queryKey: ['userFavorites'],
        queryFn: async () => {
            const res = await favoritesService.getFavorites();
            if (res.status === 'success') {
                return res.data;
            }
        },
    });
};

export const useFavoritesMutations = () => {
    const queryClient = useQueryClient();

    const addFavorite = useMutation({
        mutationFn: async (restId: string) => {
            const response = await favoritesService.setFavorites(restId);
            return response;
        },
        onSuccess: (res) => {
            if (res.status === 'success') {
                queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
            }
        },
    });

    const deleteFavorite = useMutation({
        mutationFn: async (restId: string) => {
            const response = await favoritesService.deleteFavorites(restId);
            return response;
        },
        onSuccess: (res) => {
            if (res.status === 'success') {
                queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
            }
        },
    });

    return {
        addFavorite,
        deleteFavorite,
    };
};

export default useGetFavorites;
