import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './OrderTimeCounter.module.scss';

type OrderTimeCounterProps = {
    remainingTime: number;
    initialTime: number;
    preparationStatus: string;
};

const OrderTimeCounter: FC<OrderTimeCounterProps> = ({ remainingTime, initialTime, preparationStatus }) => {
    const { t } = useTranslation();

    const sign = remainingTime < 0 ? '-' : '';
    const formattedTime = `${sign}${Math.abs(remainingTime)}`;

    const getStatusMessage = () => {
        switch (preparationStatus) {
            case 'waiting':
                return 'components.orderTimeCounter.yourOrderIsAlreadyBeingPrepared';
            case 'confirmed':
                return 'components.orderTimeCounter.yourOrderIsReady';
            case 'notConfirmed':
                return 'components.orderTimeCounter.yourOrderWillBeReadySoon';
            default:
                return 'components.orderTimeCounter.statusUnknown';
        }
    };

    const containerStyle = {
        container: remainingTime <= -1 ? styles.orderTimeCounterExpiredBorder : styles.orderTimeCounter,
        number: remainingTime <= -1 ? styles.timeExpired : '',
        image: remainingTime <= -1 ? styles.imageExpired : '',
    };

    return (
        <div className={containerStyle.container}>
            <div className={styles.orderTimeCounter__container}>
                <div className={styles.orderTimeCounter__time}>
                    <span className={`${styles.orderTimeCounter__image} ${containerStyle.image}`} />
                    <p className={`${styles.orderTimeCounter__time_number} ${containerStyle.number}`}>
                        {formattedTime}
                        {t('components.orderTimeCounter.min')}
                    </p>
                </div>
                <div className={styles.orderTimeCounter__separator}>
                    <ProgressBar initialTime={initialTime} currentTime={remainingTime} />
                </div>
                <p className={styles.orderTimeCounter__subtitle}>{t(getStatusMessage())}</p>
            </div>
        </div>
    );
};

export default OrderTimeCounter;
