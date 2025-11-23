import { FC } from 'react';
import InfoPopup from '../../../components/Popups/InfoPopup/InfoPopup';
import InfoImage from '../../../components/InfoImage/InfoImage';
import { useTranslation } from 'react-i18next';
import styles from './SuccessPasswordChange.module.scss';

const SuccessPasswordChange: FC = () => {
    const { t } = useTranslation();

    return (
        <InfoPopup isOpened={true}>
            <div className={styles.success_password_change__layout}>
                <div className={styles.success_password_change__success} />
                <h2>{t('pages.passwordSaved.title')}</h2>
                <InfoImage mode="stars_tube"></InfoImage>
            </div>
        </InfoPopup>
    );
};

export default SuccessPasswordChange;
