import React, { ReactNode } from 'react';
import classes from './Card.module.css';

type cardProps = {
	children?: ReactNode;
	className?: string;
};

const Card = ({ children, className }: cardProps) => {
	return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
