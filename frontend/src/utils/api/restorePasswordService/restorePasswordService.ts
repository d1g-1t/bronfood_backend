import { RestorePasswordServiceReal } from './restorePasswordServiceReal';

export type RestorePassword = {
    /**
     * User's phone number
     */
    phoneNumber: string;
};

export type NewPassword = {
    /**
     * User's phone number
     */
    phoneNumber: string;
    /**
     * New password
     */
    newPassword: string;
    /**
     * Code to verify user is owner of the phone number
     */
    verificationСode: string;
};

export type RequestChangePasswordResponse = {
    status: 'success';
    data: {
        temp_data_code: string;
    };
};

export type RequestChangePasswordResponseError = {
    status: 'error';
    error_message: string;
};

export type CompleteChangePasswordResponse = {
    status: 'success';
    message: string;
};

export interface RestorePasswordService {
    queryPhoneNumber: (phone: string) => Promise<RequestChangePasswordResponse | RequestChangePasswordResponseError>;
    setNewPassword: (phone: string, newPassword: string, verificationCode: string) => Promise<RequestChangePasswordResponse | RequestChangePasswordResponseError>;
    verifyPasswordChange: (temp_data_code: string, confirmation_code: string) => Promise<CompleteChangePasswordResponse | RequestChangePasswordResponseError>;
}

export const restorePasswordService = new RestorePasswordServiceReal();
