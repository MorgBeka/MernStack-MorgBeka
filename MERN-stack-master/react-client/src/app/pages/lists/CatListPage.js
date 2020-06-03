import { default as React} from 'react';
import {NavLink } from 'react-router-dom';
import ListCat from '../../components/animals/ListCat';
import {caspar} from '../../assets/images'
import { ButtonDown } from '../../components';
import { Header } from '../../components';


const CatListPage = ({}) => {
  return (
    <div className="cat_list">
		
        <div className="header">
              <div className="header__nav">
                <NavLink to="/dog_list" activeClassName="header__nav-active" ><p className="header__nav-dog">HONDEN</p></NavLink>
                <i id="paw" class="fas fa-paw"></i>
                <NavLink to="/cat_list" activeClassName="header__nav-active"> <p className="header__nav-cat">KATTEN</p></NavLink>
              </div>

              <header className="header__sort">
                 <p>SORTEER OP</p>
                 <div className="header__sort-wrapper">
                    <p className="sortOption">Regio</p>
                </div>
              </header>
        </div>   

        <ListCat path="/cat_detail" />

	  </div>

  );
};

export default CatListPage;
