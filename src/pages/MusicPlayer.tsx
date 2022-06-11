import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../util/spotify';

const MusicPlayer = () => {
	const { mid } = useParams();
	console.log(mid);

	useEffect(() => {
		const fetchTracks = async () => {
			const uri = `/playlists/${mid}/tracks?limit=10&offset=0`;
			const response = await apiClient.get(uri);
			console.log(response);
		};

		fetchTracks();
	}, [mid]);

	return <div>Music</div>;
};

export default MusicPlayer;
