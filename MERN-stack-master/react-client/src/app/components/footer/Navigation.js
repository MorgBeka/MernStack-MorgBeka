import { default as React} from 'react';
import {NavLink} from 'react-router-dom';

import * as Routes from '../../routes';

const Navigation = ({children}) =>{

	return (
		<nav className="footer__wrapper">

			
			<NavLink 
			className="footer__wrapper-link" activeClassName="footer__wrapper-link-active" id="Animal" to={Routes.DOG_LIST}>
				<div className="navigation"><i class="fas fa-paw"></i>DIEREN</div>
			</NavLink>

			<NavLink 
			className="footer__wrapper-link" activeClassName="footer__wrapper-link-active" to={Routes.SHELTER_LIST}>
					<div className="navigation"><i class="far fa-building"></i>ASIELEN</div>
			</NavLink>
					
			<NavLink 
			className="footer__wrapper-link" activeClassName="footer__wrapper-link-active" to={Routes.WALK_LIST}>
				<div className="navigation"><i class="fas fa-walking"></i>WANDELINGEN</div>
			</NavLink>
	


		
			<NavLink 
			className="footer__wrapper-link" activeClassName="footer__wrapper-link-active" to={Routes.INFORMATION}>
				<div className="navigation"><i class="fas fa-user"></i>GEGEVENS</div>
			</NavLink>
		
		</nav>
	);
};

export default Navigation;
