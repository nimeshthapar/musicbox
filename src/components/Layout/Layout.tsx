import { ReactNode, useContext } from 'react';
import SideBar from './sidebar/SideBar';
import classes from './Layout.module.css';
import BottomBar from './BottomBar/BottomBar';
import NavLinks from './NavLinks/NavLinks';
import { AuthContext } from '../../store/auth';

type LayoutProps = {
	children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<div
			className={
				!isLoggedIn
					? `${classes.login} ${classes.layout}`
					: classes.layout
			}
		>
			{isLoggedIn && (
				<SideBar>
					<NavLinks />
				</SideBar>
			)}
			{children}
			{isLoggedIn && (
				<BottomBar>
					<NavLinks />
				</BottomBar>
			)}
		</div>
	);
};

export default Layout;
