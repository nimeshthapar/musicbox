import React from 'react';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

import classes from '../Player.module.css';

type PlayerControlsProps = {
	isPlaying: boolean;
	onPrev: () => void;
	onNext: () => void;
	onPlay: () => void;
	onPause: () => void;
	onScrub: (value: number) => void;
	onScrubEnd: () => void;
	currentPercentage: number;
	trackProgress: number;
	duration: number;
};

const PlayerControls = ({
	isPlaying,
	onNext,
	onPrev,
	onPause,
	onPlay,
	onScrub,
	onScrubEnd,
	currentPercentage,
	trackProgress,
	duration,
}: PlayerControlsProps) => {
	const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}%, #fff), color-stop(${currentPercentage}%, #777))
`;

	return (
		<div className={classes.controls}>
			<div className={classes.buttons}>
				<button onClick={onPrev}>
					<MdOutlineNavigateBefore />
				</button>
				{isPlaying ? (
					<button onClick={onPause}>
						<IoMdPause />
					</button>
				) : (
					<button onClick={onPlay}>
						<IoMdPlay />
					</button>
				)}
				<button onClick={onNext}>
					<MdOutlineNavigateNext />
				</button>
			</div>
			<div className={classes.progress}>
				<input
					type="range"
					min="0"
					max={duration ? duration : `${duration}`}
					onChange={(e) => onScrub(+e.target.value)}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					style={{ background: trackStyling }}
					value={trackProgress}
				/>
			</div>
		</div>
	);
};

export default PlayerControls;
