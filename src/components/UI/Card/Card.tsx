import React, { ReactNode } from 'react';
import classes from './Card.module.css';

type cardProps = {
	children?: ReactNode;
};

const Card = ({ children }: cardProps) => {
	return <div className={classes.card}>{children}</div>;
};

export default Card;
