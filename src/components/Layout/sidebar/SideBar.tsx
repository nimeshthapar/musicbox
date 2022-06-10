import React, { ReactNode, useEffect, useState } from 'react';
import apiClient from '../../../util/spotify';
import Loading from '../../Loading/Loading';
import classes from './SideBar.module.css';

type SideBarprops = {
	children?: ReactNode;
};

const SideBar = ({ children }: SideBarprops) => {
	const [image, setImage] = useState<string>('../../../assets/spotify.png');
	const [name, setName] = useState<string>('User');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			const response = await apiClient.get('me');
			if (response.status === 200) {
				if (response.data.images.length > 0)
					setImage(response.data!.images[0].url);

				const name = response.data.display_name;
				setName(name.length > 8 ? name.substring(0, 5) + '...' : name);
			}
			setIsLoading(false);
		};

		fetchUser();
	}, []);

	const userInfoDisplay = (
		<>
			<div className={classes['img-container']}>
				<img src={image} alt="user" />
			</div>
			<p>{name}</p>
		</>
	);

	return (
		<nav className={classes.main}>
			{children}
			<div className={classes.user}>
				{isLoading ? <Loading white={false} /> : userInfoDisplay}
			</div>
		</nav>
	);
};

export default SideBar;
