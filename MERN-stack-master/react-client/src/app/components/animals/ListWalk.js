import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import ButtonHeart from '../buttons/ButtonHeart';
import { Link } from "react-router-dom";


import './List.scss';

const ListWalk = ({onReadMore}) => {
	const { findAllWalks} = useApi();
	const [ walks, setWalks] = useState();

	const initFetch = useCallback(
		() => {
		  const fetchWalks = async () => {
			const data = await findAllWalks();
			console.log(data);
			setWalks(data);

		  }
	
		  fetchWalks();
		},
		[findAllWalks ],
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
	
	  console.log(walks);

  return (
	<div className="list">
		{walks && walks.map((walk, index) => (
			<div className="listObject">
					<div className="image">
						<img className="img" src={walk.imageUrl}/>
					</div>
				<div className="blueBar">
					<ButtonHeart  title="Back"/>
					<h1  className="name">{walk.name}</h1>
					<Link to={`/walk_detail/${walk.id}`}><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
							<i id="further" class="fas fa-chevron-right"></i>
					</button>
					</Link>	
				</div>
	 	 	</div>
		))}
	</div>
  );
};

export default ListWalk;
