import Home from './pages/Home';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import MusicPlayer from './pages/MusicPlayer';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Favorites from './pages/Favorites';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/auth';

function App() {
	const { login, isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		const hash = window.location.hash;
		const token = hash.split('&')[0].split('=')[1];
		if (token) login(token);
	}, [login]);

	const loginRoutes = (
		<Routes>
			<Route path="/*" element={<Login />} />
		</Routes>
	);

	const otherRoutes = (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/playlist/:pid" element={<Playlist />} />
			<Route path="/player" element={<MusicPlayer />} />
			<Route path="/favorites" element={<Favorites />} />
		</Routes>
	);

	return <Layout>{isLoggedIn ? otherRoutes : loginRoutes}</Layout>;
}

export default App;
