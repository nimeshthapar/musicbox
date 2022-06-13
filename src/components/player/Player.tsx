import Card from '../UI/Card/Card';
import PlayerControls from './Controls/PlayerControls';
import Disc from './Disc/Disc';
import classes from './Player.module.css';
import TrackInfo from './TrackInfo/TrackInfo';

type playerProp = {
	currentTrack: any;
};

const Player = ({ currentTrack }: playerProp) => {
	const artists = [];

	if (currentTrack?.track?.artists) {
		for (const artist of currentTrack?.track?.artists) {
			artists.push(artist.name);
		}
	}

	return (
		<Card className={classes.player}>
			<div className={classes['left-body']}>
				<Disc
					image={
						currentTrack
							? currentTrack?.track?.album?.images[0]?.url
							: ''
					}
				/>
			</div>
			<div className={classes['right-body']}>
				<TrackInfo
					name={currentTrack ? currentTrack?.track?.name : ''}
					artist={artists}
				/>
				<PlayerControls />
			</div>
		</Card>
	);
};

export default Player;
