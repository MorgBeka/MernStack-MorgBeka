import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import ButtonHeart from '../buttons/ButtonHeart';
import { Link } from "react-router-dom";

import './List.scss';

const ListCat = ({onReadMore}) => {
	const { findAllCats} = useApi();
	const [ cats, setCats ] = useState();

	const initFetch = useCallback(
		() => {
		  const fetchCats = async () => {
			const data = await findAllCats();
			console.log(data);
			setCats(data);

		  }
	
		  fetchCats();
		},
		[findAllCats ],
	  )

	  useEffect(() => {
		initFetch();
	
		return () => {
		  // no cleanup
		}
	  }, [initFetch]);
	  
	 const handleReadMore = (ev, catId) => {
		ev.preventDefault();
		if (typeof onReadMore === 'function') {
		  onReadMore(catId);
		}
	  };
	
	  console.log(cats);

  return (
	<div className="list">
		{cats && cats.map((cat, index) => (
			<div className="listObject">
					<img className="img" src={cat.imageUrl}/>
				<div className="blueBar">
					<ButtonHeart  title="Back"/>
					<h1  className="name">{cat.name}</h1>
					<Link to={`/cat_detail/${cat.id}`}><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
							<i id="further" class="fas fa-chevron-right"></i>
					</button>
					</Link>		
				</div>
	 		</div>
		))}
	</div>
  );
};

export default ListCat;
