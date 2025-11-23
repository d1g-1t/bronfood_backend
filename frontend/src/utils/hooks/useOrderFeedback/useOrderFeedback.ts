import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import OrderServiceReal from '../../api/orderService/orderSeviceReal';
import { useNavigate } from 'react-router-dom';

interface UseOrderFeedbackProps {
    restaurantId: string;
    onFeedbackSubmitted: () => void;
}

interface ReviewData {
    rating: number;
    review: string;
}

export const useOrderFeedback = ({ restaurantId, onFeedbackSubmitted }: UseOrderFeedbackProps) => {
    const orderService = new OrderServiceReal();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [filledStars, setFilledStars] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setFilledStars(false);
    };

    const handleReviewChange = (newReview: string) => {
        setReview(newReview);
    };

    const triggerFilledStars = () => {
        setFilledStars(true);
    };

    const resetFilledStars = () => {
        setFilledStars(false);
    };

    const resetFeedback = () => {
        setRating(0);
        setReview('');
        resetFilledStars();
    };

    const { mutate: submitOrderFeedback, isPending: isSubmitting } = useMutation({
        mutationFn: (data: ReviewData) => orderService.submitOrderFeedback(restaurantId, data.rating, data.review),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restaurant', restaurantId, 'reviews'],
            });
            onFeedbackSubmitted();
            resetFeedback();
        },
        onError: (error) => {
            setErrorMessage(error.message);
            navigate('/');
        },
    });

    const handleSubmitReview = () => {
        if (rating === 0) {
            triggerFilledStars();
            setTimeout(() => submitOrderFeedback({ rating, review }), 1200);
        } else {
            submitOrderFeedback({ rating, review });
        }
    };

    return {
        rating,
        review,
        filledStars,
        isSubmitting,
        handleRatingChange,
        handleReviewChange,
        triggerFilledStars,
        resetFilledStars,
        handleSubmitReview,
        errorMessage,
        resetFeedback,
    };
};
