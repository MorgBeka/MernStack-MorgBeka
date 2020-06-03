import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './ButtonCalendar.scss';

const  ButtonCalendar = ({ title, color, path}) => {

	const handleClick = (ev) => {
		// ev.preventDefault();
	};

	
		return (
			//WHITE
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonCalendar">
				<p className="labelButtonCalendar">{title}</p>
			</button> </Link>
				);
			} ;
			


export  default ButtonCalendar;
