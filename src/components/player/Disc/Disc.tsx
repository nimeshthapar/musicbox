import React from 'react';
import discImg from '../../../assets/disc.png';
import classes from '../Player.module.css';

const Disc = ({ image }: { image?: string }) => {
	return (
		<div className={classes.disc}>
			<img src={image ? image : discImg} alt="disc" />
		</div>
	);
};

export default Disc;
