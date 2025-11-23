import { createContext, FC, useState, PropsWithChildren } from 'react';
import { authService, LoginData, RegisterData, UpdateUser, User, UserExtra } from '../utils/api/authService';
import { useMutation, UseMutationResult, useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';

type CurrentUserContent = {
    currentUser: User | null;
    isLogin: boolean;
    signIn: UseMutationResult<{ data: User }, Error, LoginData, unknown> | Record<string, never>;
    signUp: UseMutationResult<{ data: { temp_data_code: string } }, Error, RegisterData, unknown> | Record<string, never>;
    logout: UseMutationResult<void, Error, void, unknown> | Record<string, never>;
    updateUser: UseMutationResult<{ data: { temp_data_code: string } }, Error, UpdateUser, unknown> | Record<string, never>;
    confirmSignUp: UseMutationResult<{ data: User }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    confirmUpdateUser: UseMutationResult<{ data: UserExtra }, Error, { confirmation_code: string }, unknown> | Record<string, never>;
    profile: UseQueryResult<User, Error> | Record<string, never>;
};

export const CurrentUserContext = createContext<CurrentUserContent>({
    currentUser: null,
    isLogin: false,
    signIn: {},
    signUp: {},
    logout: {},
    updateUser: {},
    confirmSignUp: {},
    confirmUpdateUser: {},
    profile: {},
});

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [serverSMSCode, setServerSMSCode] = useState<string>('');
    const token = localStorage.getItem('token');
    const profile = useQuery({
        queryKey: ['profile'],
        queryFn: authService.checkAuthorization,
        select: (data) => data.data,
        staleTime: 1000 * 0,
        retry: false,
        enabled: !!token,
    });

    const isLogin = !!profile.data;
    const signIn = useMutation({
        mutationFn: (variables: LoginData) => authService.login(variables),
        onSuccess: () => {
            profile.refetch();
        },
    });
    const signUp = useMutation({
        mutationFn: (variables: RegisterData) => authService.register(variables),
        onSuccess: (res) => setServerSMSCode(res.data.temp_data_code),
    });
    const confirmSignUp = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmRegisterPhone({ temp_data_code: serverSMSCode, confirmation_code: variables.confirmation_code }),
        onSuccess: () => {
            setServerSMSCode('');
        },
    });
    const updateUser = useMutation({
        mutationFn: (variables: UpdateUser) => authService.updateUser(variables),
    });

    const client = useQueryClient();
    const confirmUpdateUser = useMutation({
        mutationFn: (variables: { confirmation_code: string }) => authService.confirmUpdateUser({ confirmation_code: variables.confirmation_code }),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    const logout = useMutation({
        mutationFn: () => authService.logOut(),
        onSuccess: () => {
            client.removeQueries({ queryKey: ['profile'] });
            profile.refetch();
        },
    });

    return (
        <CurrentUserContext.Provider
            value={{
                currentUser: profile.data || null,
                isLogin,
                signIn,
                signUp,
                logout,
                updateUser,
                confirmSignUp,
                confirmUpdateUser,
                profile,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};
