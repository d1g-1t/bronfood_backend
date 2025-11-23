import { FC, useState, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrderData } from '../../../utils/hooks/useOrderData/useOrderData';
import { useTimers } from '../../../utils/hooks/useTimer/useTimer';
import Modal from '../../../components/Modal/Modal';
import OrderTimeCounter from '../../../components/OrderTimeCounter/OrderTimeCounter';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Preloader from '../../../components/Preloader/Preloader';
import OrderListArticle from '../OrderListArticle/OrderListArticle';
import PopupOrderCancelled from '../../PopupOrderCancelled/PopupOrderCancelled';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';
import { formatTime } from '../../../utils/serviceFuncs/formatTime';
import styles from './WaitingOrder.module.scss';
import { useCurrentUser } from '../../../utils/hooks/useCurrentUser/useCurretUser';

const WAIT_ORDER_ID_INITIAL_TIME = 2 * 60;

const WaitingOrder: FC = () => {
    const { currentUser } = useCurrentUser();
    const userId = currentUser?.userId;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [waitOrderIdTime, setWaitOrderIdTime] = useState(WAIT_ORDER_ID_INITIAL_TIME);
    const [showOrderCancelledPopup, setShowOrderCancelledPopup] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const location = useLocation();
    const { placedOrder } = location.state || {};

    const { preparationTime, setPreparationTime, cancellationTime, setCancellationTime, cancelOrder, isLoading, preparationStatus } = useOrderData(userId ?? '', placedOrder);

    useTimers({
        setPreparationTime,
        setWaitOrderIdTime,
        setCancellationTime,
        stopTimer: () => setWaitOrderIdTime(0),
    });

    useEffect(() => {
        if (placedOrder?.id) {
            setWaitOrderIdTime(0);
        }
    }, [placedOrder?.id]);

    useEffect(() => {
        const handleOrderCancelled = () => {
            setShowOrderCancelledPopup(true);
            setPreparationTime(0);
            setCancellationTime(0);
        };

        if (cancelOrder.isSuccess) {
            handleOrderCancelled();
        }
    }, [cancelOrder.isSuccess, setPreparationTime, setCancellationTime]);

    const handleCancelOrder = () => {
        setShowConfirmationPopup(true);
    };

    useEffect(() => {
        if (cancellationTime === 0) {
            setShowConfirmationPopup(false);
        }
    }, [cancellationTime]);

    const handleConfirmCancelOrder = () => {
        if (placedOrder?.id) {
            cancelOrder.mutate(placedOrder.id);
        }
    };

    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowConfirmationPopup(false);
        }
    };

    useEsc(() => setShowConfirmationPopup(false), [setShowConfirmationPopup]);

    useEffect(() => {
        if (preparationStatus === 'confirmed' && placedOrder) {
            navigate('/leave-order-feedback', { state: { restaurantId: placedOrder.restaurantId } });
        }
    }, [preparationStatus, navigate, placedOrder]);

    return (
        <>
            {!placedOrder ? (
                <Modal>
                    <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.pleaseWaitForTheOrderConfirmation')}</h2>
                    <p className={styles.waitingOrder__subtitle}>{t('components.waitingOrder.preparationWillBeginUponConfirmation')}</p>
                    <span className={styles.waitingOrder__img} />
                    <div className={styles.waitingOrder__separator} />
                    <ProgressBar initialTime={WAIT_ORDER_ID_INITIAL_TIME} currentTime={waitOrderIdTime} />
                    <p className={styles.waitingOrder__subtitleNote}>{t('components.waitingOrder.pleaseWaitForTheOrderCode')}</p>
                </Modal>
            ) : (
                <Modal>
                    <h2 className={styles.waitingOrder__title}>{t('components.waitingOrder.orderCode')}</h2>
                    <h1 className={styles.waitingOrder__orderCode}>{placedOrder.id}</h1>
                    <OrderTimeCounter remainingTime={preparationTime ?? 0} initialTime={placedOrder.preparationTime} preparationStatus={placedOrder.preparationStatus} />
                    <div className={styles.waitingOrder__separator} />
                    <OrderListArticle order={placedOrder} />
                    {cancellationTime !== null && cancellationTime > 0 && (
                        <div className={styles.waitingOrder__cancelSection}>
                            <p className={styles.waitingOrder__subtitleNote}>
                                {t('components.waitingOrder.youCanCancelTheOrderWithin')}
                                <span className={styles.waitingOrder__subtitleNote_orange}>
                                    <span className={styles.waitingOrder__subtitleNoteTimer}>{formatTime(cancellationTime ?? 0)}</span>
                                    {t('components.orderTimeCounter.min')}
                                </span>
                            </p>
                            <button className={styles.waitingOrder__button} type="button" onClick={handleCancelOrder}>
                                {t('components.waitingOrder.cancelOrder')}
                            </button>
                        </div>
                    )}
                </Modal>
            )}
            {showConfirmationPopup && (
                <div className={styles.confirmationPopup__wrapper} onClick={handleOverlayClick}>
                    <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToCancelTheOrder')} confirmButtonText={t('components.confirmationPopup.yes')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancelOrder} />
                    {isLoading && (
                        <div className={styles.preloader__wrapper}>
                            <Preloader />
                        </div>
                    )}
                </div>
            )}
            {showOrderCancelledPopup && <PopupOrderCancelled />}
        </>
    );
};

export default WaitingOrder;
