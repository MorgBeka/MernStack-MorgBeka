import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './ButtonDown.scss';

const  ButtonDown = ({ title, color, path}) => {
	
	const handleClick = (ev) => {
		// ev.preventDefault();
	};
	
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonDown" id="down">
						<i id="down" class="fas fa-chevron-down"></i>
			</button>
			</Link>
		);		
};

export  default ButtonDown;
