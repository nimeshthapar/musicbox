import React from 'react';
import discImg from '../../../assets/disc.png';
import classes from '../Player.module.css';

const Disc = ({ image, rotate }: { image?: string; rotate: boolean }) => {
	return (
		<div
			className={
				rotate ? `${classes.disc} ${classes.rotate}` : classes.disc
			}
		>
			<img src={image ? image : discImg} alt="disc" />
		</div>
	);
};

export default Disc;
