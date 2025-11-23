import NewPassword from './NewPassword/NewPassword';
import SMSVerify from '../../components/SMSVerify/SMSVerify';
import SuccessPasswordChange from './SuccessPasswordChange/SuccessPasswordChange';
import QueryPhone from './QueryPhone/QueryPhone';
import { restorePasswordService } from '../../utils/api/restorePasswordService/restorePasswordService';
import { useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';
import { makeCamelCaseErrorMessage } from '../../utils/serviceFuncs/makeCamelCaseErrorMessage';

type TypeStage = 'START' | 'PHONE-EXIST' | 'NEW-PASSWORD-GIVEN' | 'SUCCESS';

const RestorePassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stage, setStage] = useState<TypeStage>('START');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tempDataCode, setTempDataCode] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const clearError = () => {
        setIsError(false);
        setErrorMessage('');
    };

    const timeoutRequest = () => {
        return setTimeout(() => {
            setIsLoading(false);
            setErrorMessage(makeCamelCaseErrorMessage('serverDoesntRespond'));
            setIsError(true);
        }, 10000);
    };

    const onSubmitQueryPhone = async (phoneNumber: string) => {
        setIsLoading(true);
        const timeoutQueryPhone = timeoutRequest();
        try {
            const res = await restorePasswordService.queryPhoneNumber(phoneNumber);
            if (res.status === 'success') {
                clearError();
                setIsLoading(false);
                setTempDataCode(res.data.temp_data_code);
                setStage('PHONE-EXIST');
            }
        } catch (err) {
            if (err instanceof Error) {
                setIsLoading(false);
                setErrorMessage(makeCamelCaseErrorMessage(err.message));
                setIsError(true);
            }
        }
        clearTimeout(timeoutQueryPhone);
    };

    const onSubmitChangePassword = async (password: string, password_confirm: string) => {
        setIsLoading(true);
        const timeoutChangePassword = timeoutRequest();
        try {
            const res = await restorePasswordService.setNewPassword(password, password_confirm, tempDataCode);
            if (res.status === 'success') {
                clearError();
                setIsLoading(false);
                setTempDataCode(res.data.temp_data_code);
                setStage('NEW-PASSWORD-GIVEN');
            }
        } catch (err) {
            if (err instanceof Error) {
                setIsLoading(false);
                setErrorMessage(makeCamelCaseErrorMessage(err.message));
                setIsError(true);
            }
        }
        clearTimeout(timeoutChangePassword);
    };

    const onSubmitApplyPassword = async (code: string) => {
        setIsLoading(true);
        const timeoutApplyPassword = timeoutRequest();
        try {
            const res = await restorePasswordService.verifyPasswordChange(tempDataCode, code);
            if (res.status === 'success') {
                clearError();
                setIsLoading(false);
                setStage('SUCCESS');
                localStorage.removeItem('phone');
            }
        } catch (err) {
            if (err instanceof Error) {
                setIsLoading(false);
                setErrorMessage(makeCamelCaseErrorMessage(err.message));
                setIsError(true);
            }
        }
        clearTimeout(timeoutApplyPassword);
    };

    const renderStage = () => {
        switch (stage) {
            case 'START':
                return <QueryPhone isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitQueryPhone} />;

            case 'PHONE-EXIST':
                return <NewPassword isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitChangePassword} />;

            case 'NEW-PASSWORD-GIVEN':
                return <SMSVerify isErrorVisible={isError} error={errorMessage} onSubmit={onSubmitApplyPassword} />;

            case 'SUCCESS':
                return <SuccessPasswordChange />;
        }
    };

    return <>{isLoading ? <Preloader /> : renderStage()}; </>;
};

export default RestorePassword;
