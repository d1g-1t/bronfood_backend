import { Meal } from '../restaurantsService/restaurantsService';

export interface OrderedMeal {
    /**
     * Ordered Meal type, representing the details of the meal ordered.
     */
    orderedMeal: Meal;
    /**
     * Number of units of the item ordered.
     */
    quantity: number;
}

export interface OrderState {
    /**
     * id for the user who made the order.
     */
    userId: string;
    /**
     * Unique identifier for the client who made the order.
     */
    id: string;
    /**
     * Total amount of the order in the local currency.
     */
    totalAmount: number;
    /**
     * Confirmation status of the order.
     */
    preparationStatus: 'waiting' | 'confirmed' | 'notConfirmed';
    /**
     * Time required to prepare the order, measured in minutes.
     */
    preparationTime: number;
    /**
     * Payment status of the order.
     */
    paymentStatus: 'paid' | 'notPaid';
    /**
     * Review status of the order.
     */
    reviewStatus: 'waiting' | 'reviewed' | 'skipped';
    /**
     * Time of order cancellation in seconds.
     */
    cancellationTime: number;
    /**
     * Cancellation status of the order.
     */
    cancellationStatus: 'none' | 'requested' | 'confirmed';
    /**
     * Flag indicating whether a cancellation was requested for the order.
     */
    isCancellationRequested: boolean;
    /**
     * Array with details of items in the order.
     */
    orderedMeal: OrderedMeal[];
    /**
     * Provides restaurantId for order feedback
     */
    restaurantId: string;
}
