import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Preloader from '../../components/Preloader/Preloader';
import InputPassword from '../../components/InputPassword/InputPassword';
import SMSVerify from '../../components/SMSVerify/SMSVerify';

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { updateUser, confirmUpdateUser, profile } = useCurrentUser();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { data: user, isLoading, isSuccess } = profile;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await updateUser.mutateAsync({
            phone: data.phoneNumber.replace(/\D/g, ''),
            fullname: data.username,
            password: data.newPassword || null,
            password_confirm: data.newPasswordConfirm || null,
        });
        setIsConfirmOpen(true);
    };

    const validatePasswordMatch = (value: FieldValues) => {
        const { newPassword } = getValues();
        return newPassword === value || t('pages.profile.passwordDontMatch');
    };

    const confirm = async (code: string) => {
        await confirmUpdateUser.mutateAsync({ confirmation_code: code });
        setIsConfirmOpen(false);
    };

    return (
        <>
            {isConfirmOpen ? (
                <SMSVerify onClose={confirmUpdateUser.reset} isLoading={confirmUpdateUser.isPending} isErrorVisible={confirmUpdateUser.isError} error={confirmUpdateUser.error?.message} onSubmit={confirm} />
            ) : (
                <Popup
                    title={t('pages.profile.title')}
                    onClose={() => {
                        updateUser.reset();
                        navigate('/');
                    }}
                >
                    {isLoading && <Preloader />}
                    <Form name="form-profile" onSubmit={handleSubmit(onSubmit)}>
                        {updateUser.isError && <ErrorMessage message={t(`pages.profile.${updateUser.error.message}`)} />}
                        {isSuccess && (
                            <FormInputs>
                                <Input type="text" name="username" placeholder={t('pages.profile.placeholderUserName')} nameLabel={t('pages.profile.nameLabelUserName')} register={register} errors={errors} pattern={regexClientName} value={user.fullname}></Input>
                                <InputPhone register={register} errors={errors} value={user.phone}></InputPhone>
                                <InputPassword register={register} errors={errors} name="newPassword" nameLabel={t('pages.profile.nameLabelPassword')} required={false} />
                                <InputPassword register={register} errors={errors} name="newPasswordConfirm" nameLabel={t('pages.profile.nameLabelRepeatPassword')} validate={validatePasswordMatch} required={false} />
                            </FormInputs>
                        )}
                        <div className={styles.profile__button_space}></div>
                        <Button disabled={updateUser.isPending}>{t('pages.profile.save')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default Profile;
