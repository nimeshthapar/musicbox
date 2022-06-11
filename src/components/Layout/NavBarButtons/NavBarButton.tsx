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
	const keyPath = path.split('/')[1];

	const button = (
		<span
			className={
				location.pathname === path ||
				(keyPath !== '' && location.pathname.includes(keyPath))
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

	return (
		<div className={classes['link-container']}>
			<Link to={path}>{button}</Link>
		</div>
	);
};

export default NavBarButton;
