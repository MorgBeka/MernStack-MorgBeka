import {default as  React } from 'react';
import {Link } from 'react-router-dom';

import './ButtonHeart.scss';

const  ButtonHeart = ({ title, color, path}) => {
	
	const handleClick = (ev) => {
		// ev.preventDefault();
	};
	
	if(color==='pink'){
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonHeart" style={{backgroundColor: "#0000"}}>
						<i id="heart" class="far fa-heart" style={{color: "#DEA894"}}></i>
			</button>
			</Link>
				);	
	}else{
		return (
			<Link to={path}><button type='submit' onClick={handleClick} className="a-ButtonHeart" style={{backgroundColor: "#0000"}}>
						<i id="heart" class="far fa-heart"></i>
			</button>
			</Link>
				);	
	}
			
};

export  default ButtonHeart;
