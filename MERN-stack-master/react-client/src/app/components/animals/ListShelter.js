import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import ButtonHeart from '../buttons/ButtonHeart';
import { Link } from "react-router-dom";

import './List.scss';

const ListShelter = ({onReadMore}) => {
	const { findAllShelters} = useApi();
	const [ shelters, setShelters ] = useState();

	const initFetch = useCallback(
		() => {
		  const fetchShelters = async () => {
			const data = await findAllShelters();
			console.log(data);
			setShelters(data);

		  }
	
		  fetchShelters();
		},
		[findAllShelters ],
	  )

	  useEffect(() => {
		initFetch();
	
		return () => {
		  // no cleanup
		}
	  }, [initFetch]);
	  
	   const handleReadMore = (ev, shelterId) => {
		ev.preventDefault();
		if (typeof onReadMore === 'function') {
		  onReadMore(shelterId);
		}
	  }; 
	
	  console.log(shelters);

  return (
	<div className="list">
		{shelters && shelters.map((shelter, index) => (
			<div className="listObject">
				<div className="image">
					<img className="img" src={shelter.imageUrl}/>
				</div>
				
				<div className="blueBar">
					<ButtonHeart  title="Back"/>
					<h1  className="name">{shelter.name}</h1>
				
					<Link to={`/shelter_detail/${shelter.id}`}><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
							<i id="further" class="fas fa-chevron-right"></i>
					</button>
					</Link>
				</div>
		 	</div>

		))}


	</div>
  );
};

export default ListShelter;
