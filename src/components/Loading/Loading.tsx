import React from 'react';
import classes from './Loading.module.css';

type LoadingProps = {
	white: boolean;
};

const Loading = ({ white }: LoadingProps) => {
	return (
		<div
			className={`${classes['lds-ellipsis']} ${
				!white && classes['not-white']
			}`}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loading;
