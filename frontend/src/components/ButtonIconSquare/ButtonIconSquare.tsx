import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonIconSquare.module.scss';

interface ButtonIconSquareProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'back' | 'delete';
}

const ButtonIconSquare: FC<ButtonIconSquareProps> = ({ isActive = false, icon = 'close', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles.button_icon_square}
                ${styles[`button_icon_square_${isActive && icon === 'delete' ? `${icon}_active` : icon}`]}
            `}
        />
    );
};

export default ButtonIconSquare;
