import { default as React, useCallback, useEffect, useState} from 'react';
import { ButtonAppointment } from '../../components';
import {Link } from 'react-router-dom';
import DetailDog from '../../components/animals/DetailDog';
import { ButtonBack } from '../../components';
import { useParams } from 'react-router';
import { useApi } from '../../services';

import '../../layouts/DetailLayout'


const DogDetailPage = ({children}) => {
  const { id } = useParams();
	const { findDog } = useApi();
	const [ dog, setDog] = useState(null);
  
	const initFetch = useCallback(
	  () => {
		const fetchDog = async () => {
		  const data = await findDog(id);
	
		  setDog(data);
		}

		fetchDog();
	  },
	  [findDog, id],
	)
  
	useEffect(() => {
	  initFetch();
  
	  return () => {
		// no cleanup
	  }
	}, [initFetch, id]);

	console.log(dog)
  return (
    
    <div className="detail">

  
			<ButtonBack  path="/dog_list"  title="Back"/>

     	<div className="">      
      		<DetailDog dog={dog} />
     	</div>

      	<div className="appointment">
          	<p className="title">Klik hier om een  afspraak te maken</p>
          	<ButtonAppointment path="/adopt_calendar" title="ADOPTEREN" color="white" className="button__appointment-adopt"/>
          	<ButtonAppointment path="/adopt_calendar" title="WANDELEN" color="white" className="button__appointment-walk"/>
      	</div>     
    </div>
  );
};

export default DogDetailPage;
