import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryType } from '../../models/category';
import Li from '../UI/Li/Li';

const Category = ({ id, name, image }: categoryType) => {
	const navigate = useNavigate();
	const liClickHandler = () => {
		navigate(`/playlist/${id}`, { state: { name } });
	};
	return (
		<div onClick={liClickHandler}>
			<Li id={id} name={name} image={image} />
		</div>
	);
};

export default Category;
