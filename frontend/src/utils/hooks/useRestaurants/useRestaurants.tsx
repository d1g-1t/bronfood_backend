import { useContext } from 'react';
import { RestaurantsContext } from '../../../contexts/RestaurantsContext';

export const useRestaurants = () => useContext(RestaurantsContext);
