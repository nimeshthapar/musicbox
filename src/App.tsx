import Home from './pages/Home';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import MusicPlayer from './pages/MusicPlayer';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/auth';
import NotFound from './pages/NotFound';
import { useLocation } from 'react-router-dom';

function App() {
	const { login, isLoggedIn } = useContext(AuthContext);
	const location = useLocation();
	useEffect(() => {
		const token = location.hash.split('&')[0].split('=')[1];

		if (token !== undefined) login(token, -1);
	}, [login, location]);

	const loginRoutes = (
		<Routes>
			<Route path="/*" element={<Login />} />
		</Routes>
	);

	const otherRoutes = (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/playlist/:pid" element={<Playlist />} />
			<Route path="/player/:mid" element={<MusicPlayer />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);

	return <Layout>{isLoggedIn ? otherRoutes : loginRoutes}</Layout>;
}

export default App;
