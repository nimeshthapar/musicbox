import React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { categoryType } from '../../../models/category';
import Card from '../Card/Card';
import classes from './Li.module.css';

const Li = ({ image, id, name }: categoryType) => {
	return (
		<li className={classes['category-list']}>
			<Card>
				<div className={classes['img-container']}>
					<img src={image} alt={id} />
					<span>
						<MdPlayArrow />
					</span>
				</div>
				<p>{name.length < 15 ? name : name.substring(0, 16) + '...'}</p>
			</Card>
		</li>
	);
};

export default Li;
