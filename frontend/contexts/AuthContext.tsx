'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'branch_representative' | 'family_member';
    branchId?: string;
    permissions: string[];
    avatar?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
    clearError: () => void;
    hasPermission: (permission: string) => boolean;
    hasRole: (role: User['role']) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // Check for existing token on app load
        const token = localStorage.getItem('auth_token');
        if (token) {
            // Validate token with backend
            validateToken(token);
        } else {
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
            const response = await fetch('/api/auth/validate', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const { user } = await response.json();
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token },
                });
            } else {
                localStorage.removeItem('auth_token');
                dispatch({ type: 'LOGOUT' });
            }
        } catch (error) {
            localStorage.removeItem('auth_token');
            dispatch({ type: 'LOGOUT' });
        }
    };

    const login = async (email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user: data.user, token: data.token },
                });
            } else {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: data.message || 'Login failed',
                });
            }
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: 'Network error occurred',
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        dispatch({ type: 'LOGOUT' });
    };

    const updateUser = (user: User) => {
        dispatch({ type: 'UPDATE_USER', payload: user });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const hasPermission = (permission: string): boolean => {
        return state.user?.permissions.includes(permission) || false;
    };

    const hasRole = (role: User['role']): boolean => {
        return state.user?.role === role || false;
    };

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        updateUser,
        clearError,
        hasPermission,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 