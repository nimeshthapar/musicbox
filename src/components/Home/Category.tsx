import React from 'react';
import { Link } from 'react-router-dom';
import { categoryType } from '../../models/category';
import Li from '../UI/Li/Li';

const Category = ({ id, name, image }: categoryType) => {
	return (
		<Link to={`/playlist/${id}`}>
			<Li id={id} name={name} image={image} />
		</Link>
	);
};

export default Category;
