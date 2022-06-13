import React from 'react';
import classes from './Album.module.css';
import noAlbumImg from '../../../assets/NoAlbum.png';

const AlbumImg = ({ image, noTrack }: { image: string; noTrack: boolean }) => {
	return (
		<div className={classes['img-container']}>
			<img src={noTrack ? noAlbumImg : image} alt="album" />
		</div>
	);
};

export default AlbumImg;
