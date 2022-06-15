import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useContext, useEffect } from 'react';
import { AuthContext } from './store/auth';
import NotFound from './pages/NotFound';
import { useLocation } from 'react-router-dom';
import Loading from './components/Loading/Loading';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Playlist = lazy(() => import('./pages/Playlist'));
const MusicPlayer = lazy(() => import('./pages/MusicPlayer'));

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

	return (
		<Layout>
			<Suspense
				fallback={
					<div className="center">
						<Loading white={true} />
					</div>
				}
			>
				{isLoggedIn ? otherRoutes : loginRoutes}
			</Suspense>
		</Layout>
	);
}

export default App;
