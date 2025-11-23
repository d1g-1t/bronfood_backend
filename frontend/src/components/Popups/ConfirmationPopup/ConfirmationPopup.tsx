import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ConfirmPopup.module.scss';

type ConfirmationPopupProps = {
    title: string;
    confirmButtonText: string;
    onCancel: () => void;
    onSubmit: () => void;
    children?: ReactNode;
};

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ title, confirmButtonText, onCancel, onSubmit, children }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.confirmPopup}>
            <h2 className={styles.confirmPopup__title}>{title}</h2>
            {children}
            <button className={styles.confirmPopup__close} onClick={onCancel}></button>
            <div className={styles.confirmPopup__buttonContainer}>
                <button className={styles.cancel} onClick={onCancel}>
                    {t('components.confirmationPopup.cancel')}
                </button>
                <button className={styles.confirm} onClick={onSubmit}>
                    {confirmButtonText}
                </button>
            </div>
        </div>
    );
};
export default ConfirmationPopup;
