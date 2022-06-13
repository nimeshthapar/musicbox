import React from 'react';
import classes from './Album.module.css';

const AlbumImg = ({ image }: { image: string }) => {
	return (
		<div className={classes['img-container']}>
			<img src={image} alt="album" />
		</div>
	);
};

export default AlbumImg;
