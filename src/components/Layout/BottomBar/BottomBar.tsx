import React, { ReactNode } from 'react';
import classes from './BottomBar.module.css';

type BottomBarprops = {
	children?: ReactNode;
};

const BottomBar = ({ children }: BottomBarprops) => {
	return <nav className={classes.bottom}>{children}</nav>;
};

export default BottomBar;
