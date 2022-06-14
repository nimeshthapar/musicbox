import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import Album from '../components/player/Album/Album';
import Player from '../components/player/Player';
import SongList from '../components/player/SongList/SongList';
import apiClient from '../util/spotify';
import classes from './shared.module.css';

const MusicPlayer = () => {
	const { mid } = useParams();
	const noTrack = mid === 'no-track';
	const location = useLocation();

	const playlistName = noTrack ? '' : location.state.name;
	const playlistDesc = noTrack ? '' : location.state.description;
	const playlistImg = noTrack ? '' : location.state.image;
	const [tracks, setTracks] = useState<any[]>([]);
	const [currIdx, setCurrIdx] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchTracks = async () => {
			setIsLoading(true);
			const uri = `/playlists/${mid}/tracks`;
			const response = await apiClient.get(uri);
			setTracks(response.data.items);
			setCurrIdx(0);
			setIsLoading(false);
		};

		if (!noTrack) fetchTracks();
	}, [mid, noTrack]);

	const prevTrackHandler = useCallback(() => {
		setCurrIdx((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
	}, [tracks]);

	const nextTrackHandler = useCallback(() => {
		setCurrIdx((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
	}, [tracks]);

	const onChangeSong = (idx: number) => {
		setCurrIdx(idx);
	};

	return (
		<div className={classes.screen}>
			{isLoading && <Loading white={true} />}
			{!isLoading && (
				<div className={classes.player}>
					<div className={classes['left-body']}>
						{!noTrack && (
							<Player
								currentTrack={tracks[currIdx]}
								currIdx={currIdx}
								onPrev={prevTrackHandler}
								onNext={nextTrackHandler}
							/>
						)}
						<SongList
							tracks={tracks}
							currentPlaying={currIdx}
							onChangeSong={onChangeSong}
						/>
					</div>
					<div className={classes['album-container']}>
						<Album
							name={playlistName}
							description={playlistDesc}
							image={playlistImg}
							noTrack={noTrack}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default MusicPlayer;
