import { default as React, useCallback, useEffect, useState} from 'react';
import { ButtonAppointment } from '../../components';
import DetailShelter from '../../components/animals/DetailShelter';
import { ButtonBack } from '../../components';
import {Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useApi } from '../../services';


const ShelterDetailPage = ({children}) => {
  const { id } = useParams();
	const { findShelter } = useApi();
	const [ shelter, setShelter] = useState(null);
  
	const initFetch = useCallback(
	  () => {
		const fetchShelter = async () => {
		  const data = await findShelter(id);
	
		  setShelter(data);
		}

		fetchShelter();
	  },
	  [findShelter, id],
	)
  
	useEffect(() => {
	  initFetch();
  
	  return () => {
		// no cleanup
	  }
	}, [initFetch, id]);

	console.log(shelter)
  return (
    <div className="detail">
         
			<ButtonBack  path="/shelter_list"  title="Back"/>

      <div className="">      
      		<DetailShelter shelter={shelter} />
      </div>
     
    </div>

  );
};

export default ShelterDetailPage;
