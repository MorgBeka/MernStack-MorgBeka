import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './ButtonBack.scss';

const  ButtonBack = ({ title, color, path}) => {
	
	const handleClick = (ev) => {
	};
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonBack" id="back">
						<i id="back" class="fas fa-chevron-left"></i>
			</button>
			</Link>
		);		
};

export  default ButtonBack;
