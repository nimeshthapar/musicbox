import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './shared.module.css';
import apiClient from '../util/spotify';
import { categoryType } from '../models/category';
import Loading from '../components/Loading/Loading';
import PlayListItem from '../components/PlayList/PlayListItem';
import playlistPng from '../assets/images.png';

type PlaylistType = categoryType;

const Playlist = () => {
	const { pid } = useParams();

	const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	let offset = useRef<number>(0);
	useEffect(() => {
		const fetchPlaylists = async () => {
			setIsLoading(true);
			const uri =
				pid === 'me'
					? 'me/playlists'
					: `browse/categories/${pid}/playlists?offset=${offset.current}&limit=12`;
			const response = await apiClient.get(uri);

			const loadedPlaylists: PlaylistType[] = [];

			for (const playlist of pid === 'me'
				? response.data.items
				: response.data.playlists.items) {
				loadedPlaylists.push({
					name: playlist.name,
					id: playlist.id,
					image:
						playlist.images.length > 0
							? playlist.images[0].url
							: playlistPng,
				});
			}

			setPlaylists((prev) => {
				const newList = [...prev, ...loadedPlaylists];

				const jsonObject = newList.map((el) => JSON.stringify(el));

				const uniqueSet = new Set(jsonObject);
				return Array.from(uniqueSet).map((el) => JSON.parse(el));
			});
			setIsLoading(false);
			offset.current = offset.current + 12;
		};

		fetchPlaylists();

		window.addEventListener('scroll', () => {
			let userScrollHeight = window.innerHeight + window.scrollY;
			let windowBottomHeight = document.documentElement.offsetHeight;
			if (userScrollHeight >= windowBottomHeight && offset.current < 55) {
				fetchPlaylists();
			}
		});
	}, [pid]);

	const playlistUlEl = (
		<ul className={classes.lists}>
			{playlists.map((playlist) => (
				<PlayListItem
					key={playlist.id}
					id={playlist.id}
					image={playlist.image}
					name={playlist.name}
				/>
			))}
		</ul>
	);

	return (
		<div className={classes.screen}>
			<h1 className={classes.heading}>
				{pid === 'me' ? 'My PlayList' : 'Playlists'}
			</h1>
			{!isLoading && playlistUlEl}
			{isLoading && <Loading white={true} />}
		</div>
	);
};

export default Playlist;
