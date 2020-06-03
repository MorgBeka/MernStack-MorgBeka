import { default as React } from 'react';
import { ButtonDown } from '../../components';


import './Header.scss';

const Header = ({title, subtitle}) => {
  return (
  <div className="header">
	  	<h1  className="top__title">{title}</h1>  
          <div className="header__sort">
          <p>SORTEER OP</p>
                <p className="sortOption">Regio</p>
          </div>
          
          
  </div>
  );
};

export default Header;
