import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './Button.scss';

const  Button = ({ title, color, path}) => {

	const handleClick = (ev) => {
		// ev.preventDefault();
	};

	// if  (color === 'blue'){
	
		return (
			//WHITE
			<Link to={path}><button type='submit' onClick={handleClick} className="a-Button" style={{backgroundColor: "#f1f1f1", color: "#363B4D"}}>
				<p className="labelButton">{title}</p>
			</button> </Link>
				);

			/* } else {
				//BLUE
			return(
			<Link to={path}><button type='submit' onClick={handleClick} className="a-Button" style={{backgroundColor: "#f1f1f1", color: "#f1f1f1"}}>
				<p className="labelButton">{title}</p>
			</button>
			</Link>
			);

			 */
};

export  default Button;
