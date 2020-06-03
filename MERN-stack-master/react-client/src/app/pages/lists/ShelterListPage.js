import { default as React} from 'react';
import {ListShelter} from '../../components/animals'
import { Header } from '../../components';
import {gent} from '../../assets/images'
import { ButtonDown } from '../../components';



const ShelterListPage = () => {
  return (
    <div className="shelter_list">
  		
      <Header title="ASIELEN"/>
     
      <ListShelter path="/shelter_detail"/>

  	</div>

  );
};

export default ShelterListPage;
