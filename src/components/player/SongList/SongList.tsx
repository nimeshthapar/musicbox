import React from 'react';
import Card from '../../UI/Card/Card';
import classes from './Song.module.css';
import SongItem from './SongItem';

type SongListProps = {
	tracks: any[];
	currentPlaying: number;
};

const SongList = ({ tracks, currentPlaying }: SongListProps) => {
	return (
		<Card className={classes['list-card']}>
			<ul className={classes['song-list']}>
				{tracks.map((track, idx) => (
					<SongItem
						key={track.track.id}
						id={track.track.id}
						time={track.track.duration_ms}
						name={track.track.name}
						popularity={track.track.popularity}
						index={idx}
						currentPlaying={idx === currentPlaying}
					/>
				))}
			</ul>
		</Card>
	);
};

export default SongList;
