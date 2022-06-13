import React from 'react';
import { useNavigate } from 'react-router-dom';
import { playlistType } from '../../models/playlist';
import Li from '../UI/Li/Li';

const PlayListItem = ({ id, image, name, description }: playlistType) => {
	const navigate = useNavigate();
	const playListItemClickHandler = () => {
		navigate(`/player/${id}`, { state: { name, description, image } });
	};
	return (
		<div onClick={playListItemClickHandler}>
			<Li id={id} image={image} name={name} />
		</div>
	);
};

export default PlayListItem;
