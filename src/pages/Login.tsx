import React from 'react';
import { loginEndPoint } from '../util/spotify';
import SpotifyLogo from '../assets/spotify.png';

const Login = () => {
	return (
		<div className="center">
			<div className="spotify-logo">
				<img src={SpotifyLogo} alt="spotify-logo" />
			</div>
			<a href={loginEndPoint} className="login-link">
				LOGIN
			</a>
		</div>
	);
};

export default Login;
