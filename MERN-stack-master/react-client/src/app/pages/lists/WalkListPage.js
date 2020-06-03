import { default as React} from 'react';
import { Header } from '../../components';
import ListWalk from '../../components/animals/ListWalk';
import {RegioGent} from '../../assets/images'


const WalkListPage = () => {
  return (
    <div className="walk_list">
		
      <Header title="WANDELINGEN"/>
    	
      <ListWalk/>

    </div>
  );
};




export default WalkListPage;
