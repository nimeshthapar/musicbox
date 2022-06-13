import React from 'react';
import classes from './Album.module.css';

const AlbumInfo = ({
	name,
	description,
}: {
	name: string;
	description: string;
}) => {
	return (
		<div className={classes['album-info']}>
			<h1>{name}</h1>
			<p>{description}</p>
		</div>
	);
};

export default AlbumInfo;
