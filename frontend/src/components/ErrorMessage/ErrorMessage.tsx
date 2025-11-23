import { FC } from 'react';
import styles from './ErrorMessage.module.scss';
interface ErrorMessage {
    message?: string;
}

const ErrorMessage: FC<ErrorMessage> = (props) => {
    const { message } = props;
    return (
        <div className={styles.error}>
            <div className={styles.error__container}>
                <div className={styles.error__icon} />
                <p className={styles.error__text}>{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;
