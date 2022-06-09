import { IconType } from 'react-icons';
import classes from './NavBarButton.module.css';
import { useLocation, Link } from 'react-router-dom';

type NavBarButtonProps = {
	Icon: IconType;
	title: string;
	path: string;
	btn: boolean;
	onClick?: () => void;
};

const NavBarButton = ({
	Icon,
	title,
	path,
	btn,
	onClick,
}: NavBarButtonProps) => {
	const location = useLocation();

	const button = (
		<span
			className={
				location.pathname === path
					? `${classes['nav-btn']} ${classes.active}`
					: classes['nav-btn']
			}
			onClick={onClick}
		>
			<Icon />
			<p>{title}</p>
		</span>
	);

	if (btn) {
		return button;
	}

	return <Link to={path}>{button}</Link>;
};

export default NavBarButton;
