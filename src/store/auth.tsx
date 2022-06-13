import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setClientToken } from '../util/spotify';

type AuthContextType = {
	isLoggedIn: boolean;
	token: string;
	login: (token: string) => void;
	logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
	isLoggedIn: false,
	token: '',
	login: (token: string) => {},
	logout: () => {},
});

type AuthProviderProps = {
	children?: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [token, setToken] = useState<string>('');
	const navigate = useNavigate();

	const login = useCallback((tkn: string) => {
		setToken(tkn);
		setIsLoggedIn(true);
		localStorage.setItem('token', tkn);
		setClientToken(tkn);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		setToken('');
		setIsLoggedIn(false);
		navigate('/');
	}, [navigate]);

	useEffect(() => {
		const tkn = localStorage.getItem('token');
		if (tkn != null) {
			login(tkn);
		} else {
			logout();
		}
	}, [login, logout]);

	const value = {
		isLoggedIn,
		token,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
