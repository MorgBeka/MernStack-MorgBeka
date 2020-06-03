import { default as React} from 'react';
import {Link } from 'react-router-dom';

import ConfirmationAdoption from '../../components/appointment/ConfirmationAdoption';
import { ButtonBack } from '../../components';
import { ButtonAppointment } from '../../components';

import {caspar} from '../../assets/images'


const AdoptConfirmationPage = () => {
  return (
    
    <div className="confirmation">
	    <ConfirmationAdoption img={caspar} />
		
		<div className="buttonList">
			 <ButtonAppointment path="/dog_list" title="TERUG NAAR LIJST" color="white" className="button__appointment-adopt"/>
		</div>            
    </div>
  );
};

export default AdoptConfirmationPage;
