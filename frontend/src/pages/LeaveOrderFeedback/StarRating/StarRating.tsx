import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import styles from './StarRating.module.scss';
import starGreyImg from '../../../vendor/images/icons/star-grey.svg';
import starOrangeImg from '../../../vendor/images/icons/star-orange.svg';
import starRedImg from '../../../vendor/images/icons/star-red.svg';

interface RatingProps {
    maxRating: number;
    onRatingChange: (rating: number) => void;
    filledStars: boolean;
    resetFilledStars: () => void;
}

const StarRating: React.FC<RatingProps> = ({ maxRating, onRatingChange, filledStars, resetFilledStars }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [redStars, setRedStars] = useState<number[]>([]);

    useEffect(() => {
        if (filledStars) {
            const timeouts: NodeJS.Timeout[] = [];
            for (let i = 1; i <= maxRating; i++) {
                const timeout = setTimeout(() => {
                    setRedStars((prev) => [...prev, i]);
                }, i * 200);
                timeouts.push(timeout);
            }
            const clearRedStarsTimeout = setTimeout(
                () => {
                    setRedStars([]);
                    resetFilledStars();
                },
                maxRating * 200 + 400
            );

            return () => {
                timeouts.forEach(clearTimeout);
                clearTimeout(clearRedStarsTimeout);
            };
        }
    }, [filledStars, maxRating, resetFilledStars]);

    useEffect(() => {
        if (!filledStars) {
            setRating(0);
            setHoverRating(0);
        }
    }, [filledStars]);

    const handleClick = (ratingValue: number) => {
        setRating(ratingValue);
        onRatingChange(ratingValue);
    };

    const handleMouseOver = (ratingValue: number) => {
        setHoverRating(ratingValue);
    };

    const handleMouseOut = () => {
        setHoverRating(0);
    };

    return (
        <div className={styles.starRating}>
            {Array.from({ length: maxRating }, (_, index) => index + 1).map((star) => (
                <div key={star} className={styles.starRating__star} onClick={() => handleClick(star)} onMouseOver={() => handleMouseOver(star)} onMouseOut={handleMouseOut}>
                    <img src={starGreyImg} alt={t('pages.leaveOrderFeedback.starGrey', { number: star })} className={styles.starRating__img} />
                    <img src={starOrangeImg} alt={t('pages.leaveOrderFeedback.starOrange', { number: star })} className={`${styles.starRating__img} ${styles.starRating__img_filled}`} style={{ opacity: star <= (hoverRating || rating) ? 1 : 0 }} />
                    {redStars.includes(star) && <img src={starRedImg} alt={t('pages.leaveOrderFeedback.starRed', { number: star })} className={`${styles.starRating__img} ${styles.starRating__img_error}`} />}
                </div>
            ))}
        </div>
    );
};

export default StarRating;
