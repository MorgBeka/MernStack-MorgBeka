import { default as React} from 'react';
import {NavLink } from 'react-router-dom';

import {List} from '../../components/animals';
import { ButtonDown } from '../../components';

const DogListPage = ({}) => {
  return (
 
    <div className="dog_list">
        
        <div className="header">
          <div className="header__nav">
                  <NavLink to="/dog_list" activeClassName="header__nav-active" ><p className="header__nav-dog">HONDEN</p></NavLink>
                  <i id="paw" class="fas fa-paw"></i>
                  <NavLink to="/cat_list" activeClassName="header__nav-active"> <p className="header__nav-cat">KATTEN</p></NavLink>
          </div>

          <div className="header__sort">
                <p>SORTEER OP</p>
                <p className="sortOption">Regio</p>
          </div>
        </div>   

        <div>
              <List classname="lijst" />
        </div>
    </div>
  );
};

export default DogListPage;
