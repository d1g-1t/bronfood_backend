import { FC, useEffect, MouseEvent } from 'react';
import styles from './Logout.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useEsc } from '../../utils/hooks/useEsc/useEsc';
import { useQueryClient } from '@tanstack/react-query';

const Logout: FC = () => {
    const queryClient = useQueryClient();
    const { currentUser, logout } = useCurrentUser();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            logout.mutate();
        } finally {
            logout.reset();
            queryClient.setQueryData(['basket'], () => {
                return {
                    data: {
                        restaurant: {},
                        meals: [],
                    },
                };
            });
        }
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            navigate('/');
        }
    };
    const onClose = () => {
        logout.reset();
        navigate('/');
    };
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
    useEsc(() => {
        onClose();
    }, []);

    return (
        <div className={styles.logout} onClick={handleOverlayClick}>
            <ConfirmationPopup title={t(`pages.logout.areYouSure`)} confirmButtonText={t(`pages.logout.signout`)} onCancel={onClose} onSubmit={handleLogout}>
                {logout.isPending && <Preloader />}
                {logout.isError && <ErrorMessage message={t(`pages.logout.${logout.error.message}`)} />}
            </ConfirmationPopup>
        </div>
    );
};

export default Logout;
