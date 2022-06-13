import { useEffect, useRef } from 'react';
import { BsHeartFill, BsClockFill } from 'react-icons/bs';
import classes from './Song.module.css';

type SongItemProps = {
	id: string;
	time: number;
	name: string;
	popularity: number;
	index: number;
	currentPlaying: boolean;
};

const SongItem = ({
	time,
	name,
	popularity,
	index,
	currentPlaying,
}: SongItemProps) => {
	const highlightedRef = useRef<any>(null);

	useEffect(() => {
		if (currentPlaying)
			highlightedRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentPlaying]);

	const second = Math.floor((time / 1000) % 60);
	const minutes = Math.floor((time / 1000 / 60) % 60);
	const timeString = `${minutes}:${
		second < 10 ? '0' + second.toString() : second
	}`;

	return (
		<li
			className={
				currentPlaying
					? `${classes['song-item']} ${classes.highlighted}`
					: classes['song-item']
			}
			ref={highlightedRef}
		>
			<span>{index < 9 ? '0' + (index + 1).toString() : index + 1}.</span>
			<span
				className={
					name.length > 25
						? `${classes.move} ${classes.name}`
						: classes.name
				}
			>
				<p>{name}</p>
			</span>
			<span className={classes.time}>
				<BsClockFill /> {timeString}
			</span>
			<span className={classes.likes}>
				<BsHeartFill /> {popularity}
			</span>
		</li>
	);
};

export default SongItem;
