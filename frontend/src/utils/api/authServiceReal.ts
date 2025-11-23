import { AuthService, ConfirmUpdateUser, User, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser, UserExtra } from './authService';
import { handleFetch } from '../serviceFuncs/handleFetch';

export class AuthServiceReal implements AuthService {
    /* contracts https://www.notion.so/Api-Auth-b7317228f7134259a5089a7d05e79bb2 */

    async login({ phone, password }: LoginData): Promise<{ data: User }> {
        const result = await handleFetch('signin/', { method: 'POST', data: { phone, password } });
        const { auth_token } = result.data;
        localStorage.setItem('token', auth_token);
        delete result.data.auth_token;
        return result;
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ data: { temp_data_code: string } }> {
        try {
            return handleFetch('client/request_to_signup/', { method: 'POST', data: { phone, password, fullname } });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error('connectionError');
                } else {
                    throw new Error(error.message);
                }
            } else {
                throw new Error('unknownError');
            }
        }
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData): Promise<{ data: User }> {
        const result = await handleFetch('client/signup/', { method: 'POST', data: { temp_data_code, confirmation_code } });
        const { auth_token } = result.data;
        localStorage.setItem('token', auth_token);
        delete result.data.auth_token;
        return result;
    }

    async updateUser({ fullname, phone, password, password_confirm }: UpdateUser): Promise<{ data: { temp_data_code: string } }> {
        let requestData: UpdateUser = { fullname, phone };
        if (password && password_confirm) {
            requestData = { ...requestData, password, password_confirm };
        }
        return handleFetch('client/profile/update_request/', { method: 'POST', data: requestData });
    }

    async confirmUpdateUser({ confirmation_code }: ConfirmUpdateUser): Promise<{ data: UserExtra }> {
        const result = await handleFetch('client/profile/', { method: 'PATCH', data: { confirmation_code } });
        delete result.data.auth_token;
        delete result.data.role;
        return result;
    }

    async logOut() {
        return handleFetch('client/signout/', { method: 'POST' });
    }

    async checkAuthorization(): Promise<{ data: User }> {
        const result = await handleFetch('client/profile/', { method: 'GET' });
        const { auth_token } = result.data;
        localStorage.setItem('token', auth_token);
        delete result.data.auth_token;
        delete result.status;
        return result;
    }
}
