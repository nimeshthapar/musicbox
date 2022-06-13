import React from 'react';
import classes from '../Player.module.css';

type TrackInfoProps = {
	name: string;
	artist: string[];
};

const TrackInfo = ({ name, artist }: TrackInfoProps) => {
	return (
		<div className={classes['track-info']}>
			<h3>{name}</h3>
			<p>{artist.join(', ')}</p>
		</div>
	);
};

export default TrackInfo;
