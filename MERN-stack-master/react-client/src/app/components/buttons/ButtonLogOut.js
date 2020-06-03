import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './ButtonLogOut.scss';

const  ButtonLogOut = ({ title, color, path}) => {
	
	const handleClick = (ev) => {
		// ev.preventDefault();
	};
	
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonLogOut" id="logOut">
						<div className="LogOut">
						<i id="log" class="fas fa-sign-out-alt"></i><p className="LogOut__p"> AFMELDEN</p>
						</div>
			</button>
			</Link>
		);		
};

export  default ButtonLogOut;
