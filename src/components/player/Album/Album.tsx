import React from 'react';
import Card from '../../UI/Card/Card';
import AlbumImg from './AlbumImg';
import AlbumInfo from './AlbumInfo';
import classes from './Album.module.css';

type AlbumProps = {
	name: string;
	description: string;
	image: string;
};

const Album = ({ name, description, image }: AlbumProps) => {
	return (
		<div className={classes['card-container']}>
			<Card className={classes.card}>
				<AlbumImg image={image} />
				<AlbumInfo name={name} description={description} />
			</Card>
		</div>
	);
};

export default Album;
