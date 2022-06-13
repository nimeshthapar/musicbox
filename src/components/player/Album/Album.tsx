import React from 'react';
import Card from '../../UI/Card/Card';
import AlbumImg from './AlbumImg';
import AlbumInfo from './AlbumInfo';
import classes from './Album.module.css';

type AlbumProps = {
	name: string;
	description: string;
	image: string;
	noTrack: boolean;
};

const Album = ({ name, description, image, noTrack }: AlbumProps) => {
	return (
		<div className={classes['card-container']}>
			<Card className={classes.card}>
				<AlbumImg image={image} noTrack={noTrack} />
				<AlbumInfo
					name={noTrack ? 'Unknown' : name}
					description={noTrack ? 'Unknown' : description}
				/>
			</Card>
		</div>
	);
};

export default Album;
