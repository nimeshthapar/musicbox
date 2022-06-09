import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	const login = useCallback((tkn: string) => {
		setToken(tkn);
		setIsLoggedIn(true);
		localStorage.setItem('token', tkn);
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		setToken('');
		setIsLoggedIn(false);
		navigate('/');
	};

	useEffect(() => {
		const tkn = localStorage.getItem('token');
		if (tkn) login(tkn);
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
