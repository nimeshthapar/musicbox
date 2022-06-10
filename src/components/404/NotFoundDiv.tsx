import React from 'react';
import NotFoundImg from '../../assets/not-found.jpg';
import classes from './NotFoundDiv.module.css';

const NotFoundDiv = () => {
	return (
		<div className={classes.container}>
			<div className={classes['img-container']}>
				<img src={NotFoundImg} alt="Not-Found" />
			</div>
			<p>Oh No! Page You Are Trying To Visit Dosen't Exist</p>
		</div>
	);
};

export default NotFoundDiv;
