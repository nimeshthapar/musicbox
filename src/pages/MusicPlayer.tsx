import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Album from '../components/player/Album/Album';
import Player from '../components/player/Player';
import SongList from '../components/player/SongList/SongList';
import apiClient from '../util/spotify';
import classes from './shared.module.css';

const MusicPlayer = () => {
	const { mid } = useParams();
	const location = useLocation();

	const playlistName = location.state.name;
	const playlistDesc = location.state.description;
	const playlistImg = location.state.image;
	const [tracks, setTracks] = useState<any[]>([]);
	const [currIdx, setCurrIdx] = useState(0);

	useEffect(() => {
		const fetchTracks = async () => {
			const uri = `/playlists/${mid}/tracks`;
			const response = await apiClient.get(uri);
			setTracks(response.data.items);
			setCurrIdx(0);
		};

		fetchTracks();
	}, [mid]);

	const prevTrackHandler = useCallback(() => {
		setCurrIdx((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
	}, [tracks]);

	const nextTrackHandler = useCallback(() => {
		setCurrIdx((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
	}, [tracks]);

	return (
		<div className={classes.screen}>
			<div className={classes.player}>
				<div className={classes['left-body']}>
					<Player
						currentTrack={tracks[currIdx]}
						currIdx={currIdx}
						onPrev={prevTrackHandler}
						onNext={nextTrackHandler}
					/>
					<SongList tracks={tracks} currentPlaying={currIdx} />
				</div>
				<div className={classes['album-container']}>
					<Album
						name={playlistName}
						description={playlistDesc}
						image={playlistImg}
					/>
				</div>
			</div>
		</div>
	);
};

export default MusicPlayer;
