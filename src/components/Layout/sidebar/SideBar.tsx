import React, { ReactNode } from 'react';
import classes from './SideBar.module.css';

type SideBarprops = {
	children?: ReactNode;
};

const SideBar = ({ children }: SideBarprops) => {
	return <nav className={classes.main}>{children}</nav>;
};

export default SideBar;
