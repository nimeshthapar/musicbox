import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setClientToken } from '../util/spotify';

type AuthContextType = {
	isLoggedIn: boolean;
	token: string;
	login: (token: string, expirationTime: number) => void;
	logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
	isLoggedIn: false,
	token: '',
	login: (token: string, expirationTime: number) => {},
	logout: () => {},
});

type AuthProviderProps = {
	children?: ReactNode;
};

let logoutTimer: NodeJS.Timeout;
const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [token, setToken] = useState<string>('');
	const [expiration, setExpiration] = useState<number | null>();
	const navigate = useNavigate();

	const login = useCallback((tkn: string, expirationTime: number) => {
		setToken(tkn);
		setIsLoggedIn(true);
		const tokenTime =
			expirationTime === -1 ? Date.now() + 1000 * 3600 : expirationTime;
		setExpiration(tokenTime);
		localStorage.setItem(
			'userData',
			JSON.stringify({ tkn, expirationTime: tokenTime })
		);
		setClientToken(tkn);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('userData');
		setToken('');
		setExpiration(null);
		setIsLoggedIn(false);
		navigate('/');
	}, [navigate]);

	useEffect(() => {
		if (expiration) {
			const remainingTime = expiration - Date.now();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [expiration, logout]);

	useEffect(() => {
		const userData = localStorage.getItem('userData');

		if (userData !== null) {
			const { tkn, expirationTime } = JSON.parse(userData);
			if (+expirationTime - Date.now() > 0) login(tkn, expirationTime);
		}
	}, [login]);

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
