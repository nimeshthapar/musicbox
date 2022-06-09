import React, { useContext } from 'react';
import {
	MdOutlineLibraryMusic,
	MdFavorite,
	MdPlaylistPlay,
	MdLogout,
	MdLogin,
} from 'react-icons/md';
import { BsMusicPlayer } from 'react-icons/bs';
import NavBarButton from '../NavBarButtons/NavBarButton';
import { AuthContext } from '../../../store/auth';

const NavLinks = () => {
	const { logout, isLoggedIn } = useContext(AuthContext);
	return (
		<>
			{isLoggedIn && (
				<NavBarButton
					Icon={MdOutlineLibraryMusic}
					title="Home"
					path="/"
					btn={false}
				/>
			)}
			{isLoggedIn && (
				<NavBarButton
					Icon={MdPlaylistPlay}
					title="Playlists"
					path="/playlist/p1"
					btn={false}
				/>
			)}
			{isLoggedIn && (
				<NavBarButton
					Icon={BsMusicPlayer}
					title="Player"
					path="/player"
					btn={false}
				/>
			)}
			{isLoggedIn && (
				<NavBarButton
					Icon={MdFavorite}
					title="Favorites"
					path="/favorites"
					btn={false}
				/>
			)}

			{!isLoggedIn && (
				<NavBarButton
					Icon={MdLogin}
					title="Login"
					path="/"
					btn={true}
				/>
			)}
			{isLoggedIn && (
				<NavBarButton
					Icon={MdLogout}
					title="Logout"
					path="/logout"
					btn={true}
					onClick={logout}
				/>
			)}
		</>
	);
};

export default NavLinks;
