import User from '@/models/user';

export interface AuthState {
    user: User;
    status: string;
    errors: string;
    authenticated: boolean;
}

export interface AuthSuccessResponse {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
}

export interface LoginUser {
    user: {
        email: string;
        password: string;
    };
}

export interface RegisterUser {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    };
}
