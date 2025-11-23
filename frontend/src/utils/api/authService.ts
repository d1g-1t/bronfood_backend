import { AuthServiceReal } from './authServiceReal';
// import { AuthServiceMock } from './authServiceMock';

/**
 11 digits string, no space, brackets, or +
 */
export type PhoneNumber = string;

export interface LoginData {
    phone: PhoneNumber;
    password: string;
}
export interface RegisterData {
    phone: PhoneNumber;
    password: string;
    fullname: string;
}
export interface UpdateUser {
    fullname: string;
    phone: PhoneNumber;
    password?: string;
    password_confirm?: string;
}
/*
 temp_data_code: Temporary code that the server assign to the user in db during registration
 confirmation_code: 4-digit code that user shoud enter to confirm registration
 */
export interface ConfirmRegisterPhoneData {
    temp_data_code: string;
    confirmation_code: string;
}

export interface ConfirmUpdateUser {
    confirmation_code: string;
}
export interface User {
    userId: string;
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
}
export interface UserExtra {
    userId: string;
    phone: PhoneNumber;
    fullname: string;
    role?: 'CLIENT';
    auth_token: string;
}
export interface SuccessProfileResponse {
    status: 'success';
    data: User;
}
export interface ErrorProfileResponse {
    status: 'error';
    error_message: string;
}

export interface AuthService {
    login: ({ phone, password }: LoginData) => Promise<{ data: User }>;

    register: ({ fullname, phone, password }: RegisterData) => Promise<{ data: { temp_data_code: string } }>;

    confirmRegisterPhone: ({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData) => Promise<{ data: User }>;

    updateUser: ({ fullname, phone, password, password_confirm }: UpdateUser) => Promise<{ data: { temp_data_code: string } }>;

    confirmUpdateUser: ({ confirmation_code }: ConfirmUpdateUser) => Promise<{ data: UserExtra }>;

    logOut: () => Promise<void>;

    checkAuthorization: () => Promise<{ data: User }>;
}

// export const authService = new AuthServiceMock();
export const authService = new AuthServiceReal();
