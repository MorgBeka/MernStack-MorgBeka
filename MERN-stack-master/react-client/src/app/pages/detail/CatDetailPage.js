import { default as React, useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useApi } from '../../services';
import {Link } from 'react-router-dom';

import DetailCat from '../../components/animals/DetailCat';
import { ButtonAppointment } from '../../components';
import { ButtonBack} from '../../components';

import '../../layouts/DetailLayout'


const CatDetailPage = ({children}) => {
  	const { id } = useParams();
	const { findCat } = useApi();
	const [ cat, setCat] = useState(null);
  
	const initFetch = useCallback(
	  () => {
		const fetchCat = async () => {
		  const data = await findCat(id);
	
		  setCat(data);
		}

		fetchCat();
	  },
	  [findCat, id],
	)
  
	useEffect(() => {
	  initFetch();
  
	  return () => {
		// no cleanup
	  }
	}, [initFetch, id]);

	console.log(cat)
  return (

   
    <div className="detail">
   
		<ButtonBack  path="/cat_list"  title="Back"/>

   
    	<div className="">      
      		<DetailCat cat={cat} />
      	</div>

     	<div className="appointment">
          <p className="title">Klik hier om een afspraak te maken</p>
          <	ButtonAppointment path="/adopt_calendar" title="ADOPTEREN" color="white" className="button__appointment-adopt"/>
      	</div>
    </div>
  );
};

export default CatDetailPage;
