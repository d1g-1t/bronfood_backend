import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text on button
     */
    children?: ReactNode;
}

const Button: FC<Button> = ({ ...props }) => {
    return (
        <button {...props} className={`${styles.button} ${props.disabled ? styles.button_disabled : ''}`}>
            {props.children}
        </button>
    );
};

export default Button;
