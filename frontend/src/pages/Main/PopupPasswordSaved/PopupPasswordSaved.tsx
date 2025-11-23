import InfoImage from '../../../components/InfoImage/InfoImage';
import styles from './PopupPasswordSaved.module.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPopup from '../../../components/Popups/InfoPopup/InfoPopup';

interface PopupPasswordSaved {
    /**
     * Fires when info popup closes
     */
    onCloseInfoPopup?: () => void;
    /**
     * Is InfoPopup opened?
     */
    isOpened: boolean;
    /**
     * Has this info window close button?
     */
    hasCloseButton?: boolean;
}

const PopupPasswordSaved: FC<PopupPasswordSaved> = (props) => {
    const { t } = useTranslation();

    return (
        <InfoPopup isOpened={props.isOpened}>
            <div className={styles.block}>
                <div className={styles.block__success}></div>
                <h2 className={styles.block__text}>{t('pages.passwordSaved.title')}</h2>
                <InfoImage mode="red_tube"></InfoImage>
            </div>
        </InfoPopup>
    );
};

export default PopupPasswordSaved;
