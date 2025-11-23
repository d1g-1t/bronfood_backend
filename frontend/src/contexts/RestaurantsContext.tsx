import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import i18n from '../i18n';
import { Restaurant, restaurantsService } from '../utils/api/restaurantsService/restaurantsService';
import { options, types } from '../pages/Restaurants/MockRestaurantsList';

export type Option = {
    /**
     * Option's id. Option may be either a meal's name or a venue's name
     */
    id: number;
    /**
     * Option's name
     */
    name: string;
};

export type VenueType = {
    /**
     * Type's id.
     */
    id: number;
    /**
     * Type of venue. Not to be confused with venue's name
     */
    name: string;
};

export type RestaurantsContext = {
    /**
     * Reload data restaurants
     */
    refetch: () => void;
    /**
     * Sets clicked restaurant page
     */
    setActiveRestaurant: (id: string) => void;
    /**
     * Restaurant which is clicked in a list
     */
    inView?: string;
    /**
     * List of restaurants currently on map
     */
    restaurantsOnMap: Restaurant[];
    /**
     * List of restaurants filtered with user selected options
     */
    restaurantsFiltered: Restaurant[];
    /**
     * Indicates whether restaurants are loading
     */
    isLoading: boolean;
    /**
     * Indicates whether query encountered an error
     */
    isError: boolean;
    /**
     * Restaurant to add all meals to it
     */
    restaurant: Restaurant | null;
    /**
     * Indicates whether restaurant are loading
     */
    restaurantLoading: boolean;
    /**
     * Indicates whether query encountered an error
     */
    restaurantError: boolean;
    /**
     * Reload data restaurant
     */
    refetchRestaurant: () => void;
    /**
     * Sets restaurant which is clicked in a list
     */
    setInView: (id: string) => void;
    /**
     * Restaurant which is last clicked in a list
     */
    lastClickedRestaurantId: string | null;
    /**
     * Sets restaurant which is last clicked in a list
     */
    setLastClickedRestaurantId: (id: string | null) => void;
    /**
     * Options' states and controls. Options come from user's input
     */
    options: {
        /**
         * List of all options available
         */
        all: Option[];
        /**
         * List of options selected by user
         */
        selectedOptions: Option[];
        /**
         * Add option to the list of selected options
         */
        addOption: (option: Option) => void;
        /**
         * Remove option from the list of selected options
         */
        deleteOption: (option: Option) => void;
    };
    /**
     * Types of venues states and control
     */
    venueTypes: {
        /**
         * All types of venues found on map
         */
        all: VenueType[];
        /**
         * List of venue types selected by user
         */
        selectedVenueTypes: VenueType[];
        /**
         * Add venue type to the list of selected venue types
         */
        addVenueType: (type: VenueType) => void;
        /**
         * Remove venue type from the list of selected venue types
         */
        deleteVenueType: (type: VenueType) => void;
    };
};

export const RestaurantsContext = createContext<RestaurantsContext>({
    setActiveRestaurant: () => {},
    restaurantsOnMap: [],
    restaurantsFiltered: [],
    isLoading: false,
    isError: false,
    restaurant: null,
    refetch: () => {},
    restaurantLoading: false,
    restaurantError: false,
    refetchRestaurant: () => {},
    setInView: () => {},
    lastClickedRestaurantId: null,
    setLastClickedRestaurantId: () => {},
    options: {
        all: [],
        selectedOptions: [],
        addOption: () => {},
        deleteOption: () => {},
    },
    venueTypes: {
        all: [],
        selectedVenueTypes: [],
        addVenueType: () => {},
        deleteVenueType: () => {},
    },
});

export const RestaurantsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [inView, setInView] = useState<string | undefined>(undefined);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const queryClient = useQueryClient();
    const [restaurantId, setRestaurantId] = useState<string | undefined>(undefined);
    const [lastClickedRestaurantId, setLastClickedRestaurantId] = useState<string | null>(null);
    const { isLoading, isError, isSuccess, data, refetch } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => restaurantsService.getRestaurants(),
    });
    let restaurantsOnMap: Restaurant[] = [];
    if (isSuccess) {
        restaurantsOnMap = data.data;
    }
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<VenueType[]>([]);
    const restaurantsFiltered: Restaurant[] =
        selectedOptions.length === 0 && selectedVenueTypes.length === 0
            ? restaurantsOnMap
            : restaurantsOnMap.filter((restaurant) => {
                  const optionNames = selectedOptions.map((option) => option.name.toLowerCase());
                  const typeNames = selectedVenueTypes.map((type) => type.name.toLowerCase());

                  return optionNames.includes(restaurant.name.toLowerCase()) || typeNames.includes(restaurant.type.toLowerCase());
              });
    const {
        isLoading: restaurantLoading,
        isError: restaurantError,
        data: fetchedRestaurant,
        refetch: refetchRestaurant,
    } = useQuery({
        queryKey: ['restaurant', restaurantId],
        queryFn: async () => {
            if (!restaurantId) throw new Error(i18n.t('pages.restaurantsContext.noRestaurantIdProvided'));
            const response = await restaurantsService.getRestaurantById(restaurantId);
            return response.data;
        },
        enabled: !!restaurantId,
    });
    useEffect(() => {
        if (fetchedRestaurant) {
            setRestaurant(fetchedRestaurant);
        }
    }, [fetchedRestaurant]);
    const setActiveRestaurant = useCallback(
        (id: string) => {
            setRestaurantId(id);
            setInView(id);
            queryClient.invalidateQueries({ queryKey: ['restaurant', id] });
        },
        [queryClient]
    );
    const addOption = (option: Option) => {
        if (!selectedOptions.find((opt: Option) => opt.id === option.id)) {
            setSelectedOptions([...selectedOptions, option]);
        }
    };
    const deleteOption = (option: Option) => {
        setSelectedOptions(selectedOptions.filter((opt: Option) => opt.id !== option.id));
    };
    const addVenueType = (venueType: VenueType) => {
        if (!selectedVenueTypes.find((type: VenueType) => type.id === venueType.id)) {
            setSelectedVenueTypes([...selectedVenueTypes, venueType]);
        }
    };
    const deleteVenueType = (venueType: VenueType) => {
        setSelectedVenueTypes(selectedVenueTypes.filter((type: VenueType) => type.id !== venueType.id));
    };

    return (
        <RestaurantsContext.Provider
            value={{
                isLoading,
                isError,
                restaurant,
                restaurantLoading,
                restaurantError,
                setActiveRestaurant,
                restaurantsFiltered,
                refetch: refetch,
                refetchRestaurant,
                restaurantsOnMap,
                inView,
                setInView,
                lastClickedRestaurantId,
                setLastClickedRestaurantId,
                options: {
                    all: options,
                    selectedOptions,
                    addOption,
                    deleteOption,
                },
                venueTypes: {
                    all: types,
                    selectedVenueTypes,
                    addVenueType,
                    deleteVenueType,
                },
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};
