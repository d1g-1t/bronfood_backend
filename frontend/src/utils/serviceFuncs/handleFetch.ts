import { API_URL } from '../consts';

interface FetchOptions extends RequestInit {
    data?: object;
}

/**
 * Wrapper for fetch requests
 *
 * @param {} endpoint API URL's endpoint
 * @param {} options request's custom options (optional)
 */
export const handleFetch = async (endpoint: string, { data, ...customOptions }: FetchOptions | Record<string, never> = {}) => {
    const token = localStorage.getItem('token');
    const headers: RequestInit['headers'] = {};
    if (token) {
        headers.Authorization = `Token ${token}`;
    }
    if (data) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    const options: RequestInit = {
        method: customOptions.method || 'GET',
        headers: {
            ...headers,
            ...customOptions.headers,
        },
        ...customOptions,
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const res = await fetch(`${API_URL}/${endpoint}`, options);
        if (res.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Unauthorized');
        }
        const result = await res.json();
        if (res.ok) {
            return result;
        } else {
            throw new Error(result.error_message);
        }
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('checkYourInternetConnection');
        }
        throw error;
    }
};
