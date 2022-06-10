import React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { categoryType } from '../../models/category';
import classes from './Category.module.css';

const Category = ({ id, name, image }: categoryType) => {
	return (
		<li className={classes['category-list']}>
			<div className={classes['img-container']}>
				<img src={image} alt={id} />
				<a href="/">
					<MdPlayArrow />
				</a>
			</div>
			<p>{name}</p>
		</li>
	);
};

export default Category;
