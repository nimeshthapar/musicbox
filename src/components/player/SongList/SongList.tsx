import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../UI/Card/Card';
import classes from './Song.module.css';
import SongItem from './SongItem';

type SongListProps = {
	tracks: any[];
	currentPlaying: number;
	onChangeSong: (idx: number) => void;
};

const SongList = ({ tracks, currentPlaying, onChangeSong }: SongListProps) => {
	return (
		<Card className={classes['list-card']}>
			<ul className={classes['song-list']}>
				{tracks.length > 0 &&
					tracks.map((track, idx) => (
						<SongItem
							key={track.track.id}
							id={track.track.id}
							time={track.track.duration_ms}
							name={track.track.name}
							popularity={track.track.popularity}
							index={idx}
							currentPlaying={idx === currentPlaying}
							onChangeSong={onChangeSong}
						/>
					))}
				{tracks.length === 0 && (
					<div className={classes.error}>
						<h1>No Songs to Play</h1>
						<Link to="/">Click to Browse Songs</Link>
					</div>
				)}
			</ul>
		</Card>
	);
};

export default SongList;
