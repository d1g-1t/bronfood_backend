import Popup from '../../components/Popups/Popup/Popup';
import InfoImage from '../../components/InfoImage/InfoImage';
import styles from './PopupFeedbackThanks.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PopupFeedbackThanks = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, [navigate]);
    return (
        <Popup onClose={() => navigate('/')}>
            <div className={styles.feedback__thanks}>
                <InfoImage mode="stars_tube" />
                <h2 className={styles.feedback__title}>{t('pages.popupFeedbackThanks.title')}</h2>
            </div>
        </Popup>
    );
};

export default PopupFeedbackThanks;
