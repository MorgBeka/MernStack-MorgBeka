import {default as  React } from 'react';
import {Link } from 'react-router-dom';


import './ButtonGoogle.scss';

const  ButtonGoogle = ({ title, colo, path}) => {
	
	const handleClick = (ev) => {
		// ev.preventDefault();
	};
	
		return (
			//WHITE
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonGoogle" style={{backgroundColor: "#f1f1f1"}}>
				<p className="labelButtonGoogle">{title}</p>
			</button>
			</Link>
				);
		
};

export  default ButtonGoogle;
