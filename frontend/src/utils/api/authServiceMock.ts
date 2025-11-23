import { AuthService, UserExtra, ConfirmUpdateUser } from './authService';
import { User, LoginData, RegisterData, ConfirmRegisterPhoneData, UpdateUser } from './authService';

export class AuthServiceMock implements AuthService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getToken() {
        return localStorage.getItem('token');
    }

    async login({ phone, password }: LoginData): Promise<{ data: User }> {
        await this._wait(500);
        if (phone && password) {
            localStorage.setItem('token', '23423434');
            return { data: { userId: 'u12345', fullname: 'User', phone, role: 'CLIENT' } };
        } else {
            throw new Error('invalidCredentials');
        }
    }

    async register({ fullname, phone, password }: RegisterData): Promise<{ data: { temp_data_code: string } }> {
        await this._wait(500);
        if (phone && password && fullname) {
            return { data: { temp_data_code: '1111' } };
        } else {
            throw new Error('phoneNumberIsAlreadyUsed');
        }
    }

    async confirmRegisterPhone({ temp_data_code, confirmation_code }: ConfirmRegisterPhoneData): Promise<{ data: User }> {
        await this._wait(500);
        if (temp_data_code && confirmation_code) {
            localStorage.setItem('token', '23423434');
            return { data: { userId: 'u67890', phone: '74443332211', fullname: 'user registered' } };
        } else {
            throw new Error('validationError');
        }
    }

    async updateUser({ fullname, phone }: UpdateUser): Promise<{ data: { temp_data_code: string } }> {
        await this._wait(500);
        if (phone && fullname) {
            return { data: { temp_data_code: '1111' } };
        } else {
            throw new Error('invalidCredentials');
        }
    }

    async confirmUpdateUser({ confirmation_code }: ConfirmUpdateUser): Promise<{ data: UserExtra }> {
        await this._wait(500);
        if (confirmation_code) {
            return { data: { userId: 'u56789', phone: '74449998877', fullname: 'user changed', auth_token: '23423434' } };
        } else {
            throw new Error('validationError');
        }
    }

    async logOut() {
        await this._wait(500);
        const token = this.getToken();
        if (token) {
            return;
        } else {
            throw new Error('serverError');
        }
    }

    async checkAuthorization(): Promise<{ data: User }> {
        await this._wait(500);
        if (Math.random() < 0.97) {
            localStorage.setItem('token', 'mockToken3948');
            return { data: { userId: 'u12345', fullname: 'Моковый Мок', phone: '79990001122', role: 'CLIENT' } };
        } else {
            throw new Error('wrongCredentials');
        }
    }
}
