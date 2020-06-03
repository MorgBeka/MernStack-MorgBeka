import { default as React} from 'react';


import {Link } from 'react-router-dom';
import ConfirmationWalk from '../../components/appointment/ConfirmationWalk';

import { ButtonBack } from '../../components';
import { ButtonAppointment } from '../../components';

import {aiko} from '../../assets/images'


const WalkConfirmationPage = () => {
  return (
    
    <div className="detail">
   		<ConfirmationWalk img={aiko} />

		<div className="buttonList">
			 <ButtonAppointment path="/dog_list" title="TERUG NAAR LIJST" color="white" className="button__appointment-adopt"/>
		</div>        
    </div>
  );
};

export default WalkConfirmationPage;
