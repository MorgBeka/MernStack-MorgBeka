import {default as  React } from 'react'
import {Link } from 'react-router-dom';

import './ButtonAppointment.scss';

const  Button = ({ title, color, path}) => {

	const handleClick = (ev) => {
		// ev.preventDefault();
	};	
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonAppointment">
				<p className="labelButtonAppointment">{title}</p>
			</button>
			</Link>
				);
		};

export  default Button;
