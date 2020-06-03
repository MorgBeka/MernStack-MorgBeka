import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import ButtonHeart from '../buttons/ButtonHeart';
import { Link } from "react-router-dom";

import './List.scss';

const List = ({onReadMore}) => {
	const { findAllDogs} = useApi();
	const [ dogs, setDogs ] = useState();

	const initFetch = useCallback(
		() => {
		  const fetchDogs = async () => {
			const data = await findAllDogs();
			console.log(data);
			setDogs(data);

		  }
	
		  fetchDogs();
		},
		[findAllDogs ],
	  )

	  useEffect(() => {
		initFetch();
	
		return () => {
		  // no cleanup
		}
	  }, [initFetch]);
	  
	  const handleReadMore = (ev, dogId) => {
		ev.preventDefault();
		if (typeof onReadMore === 'function') {
		  onReadMore(dogId);
		}
	  };
	
	  console.log(dogs);

  return (
	<div className="list">
		{dogs && dogs.map((dog, index) => (
			<div className="listObject">
				<img className="img" src={dog.imageUrl}/>
				<div className="blueBar">
					<ButtonHeart  title="Back"/>
					<h1  className="name">{dog.name}</h1>
					<Link to={`/dog_detail/${dog.id}`}><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
						<i id="further" class="fas fa-chevron-right"></i>
					</button>
					</Link>		
				</div>
	 		 </div>
		))}
	</div>
  );
};

export default List;
