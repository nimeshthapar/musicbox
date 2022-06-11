import React from 'react';
import { Link } from 'react-router-dom';
import { categoryType } from '../../models/category';
import Li from '../UI/Li/Li';

type PlaylistType = categoryType;

const PlayListItem = ({ id, image, name }: PlaylistType) => {
	return (
		<Link to={`/player/${id}`}>
			<Li id={id} image={image} name={name} />
		</Link>
	);
};

export default PlayListItem;
