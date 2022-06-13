import { useRef, useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card/Card';
import PlayerControls from './Controls/PlayerControls';
import Disc from './Disc/Disc';
import classes from './Player.module.css';
import TrackInfo from './TrackInfo/TrackInfo';

type playerProp = {
	currentTrack: any;
	onPrev: () => void;
	onNext: () => void;
	currIdx: number;
};

const Player = ({ currentTrack, onNext, onPrev, currIdx }: playerProp) => {
	const [trackProgress, setTrackProgress] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const audioSrc = currentTrack?.track?.preview_url;
	const audioRef = useRef(new Audio(audioSrc));
	const intervalRef = useRef<NodeJS.Timer>();
	const isReady = useRef<boolean>(false);

	const { duration } = audioRef.current;

	const currentProgress = duration ? (trackProgress / duration) * 100 : 0;

	const startTimer = useCallback(() => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				onNext();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, 1000);
	}, [onNext]);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			clearInterval(intervalRef.current);
			audioRef.current.pause();
		}
	}, [isPlaying, audioSrc, startTimer]);

	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	useEffect(() => {
		audioRef.current.pause();

		audioRef.current = new Audio(audioSrc);
		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			setIsPlaying(true);
			startTimer();
		} else {
			isReady.current = true;
		}
	}, [currIdx, audioSrc, startTimer]);

	const onScrub = (value: number) => {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	const artists = [];

	if (currentTrack?.track?.artists) {
		for (const artist of currentTrack?.track?.artists) {
			artists.push(artist.name);
		}
	}

	const playClickHandler = () => {
		setIsPlaying(true);
	};

	const pauseClickHandler = () => {
		setIsPlaying(false);
	};

	return (
		<Card className={classes.player}>
			<div className={classes['left-body']}>
				<Disc
					image={
						currentTrack
							? currentTrack?.track?.album?.images[0]?.url
							: ''
					}
					rotate={isPlaying}
				/>
			</div>
			<div className={classes['right-body']}>
				<TrackInfo
					name={currentTrack ? currentTrack?.track?.name : ''}
					artist={artists}
				/>
				<PlayerControls
					isPlaying={isPlaying}
					onNext={onNext}
					onPrev={onPrev}
					onPlay={playClickHandler}
					onPause={pauseClickHandler}
					onScrub={onScrub}
					onScrubEnd={onScrubEnd}
					currentPercentage={currentProgress}
					trackProgress={trackProgress}
					duration={duration}
				/>
			</div>
		</Card>
	);
};

export default Player;
