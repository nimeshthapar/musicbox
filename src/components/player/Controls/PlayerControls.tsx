import React from 'react';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { IoMdPlay } from 'react-icons/io';

import classes from '../Player.module.css';

const PlayerControls = () => {
	return (
		<div className={classes.controls}>
			<div className={classes.buttons}>
				<button>
					<MdOutlineNavigateBefore />
				</button>
				<button>
					<IoMdPlay />
				</button>
				<button>
					<MdOutlineNavigateNext />
				</button>
			</div>
			<div className={classes.progress}>
				<input type="range" min="0" max="100" />
			</div>
		</div>
	);
};

export default PlayerControls;
