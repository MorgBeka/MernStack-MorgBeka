import { default as React, useCallback, useEffect, useState} from 'react';
import DetailWalk from '../../components/animals/DetailWalk';
import {RegioGent} from '../../assets/images';
import { ButtonBack } from '../../components';
import {Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useApi } from '../../services';


const WalkDetailPage = ({children}) => {
  const { id } = useParams();
	const { findWalk } = useApi();
	const [ walk, setWalk] = useState(null);
  
	const initFetch = useCallback(
	  () => {
		const fetchWalk = async () => {
		  const data = await findWalk(id);
	
		  setWalk(data);
		}

		fetchWalk();
	  },
	  [findWalk, id],
	)
  
	useEffect(() => {
	  initFetch();
  
	  return () => {
		// no cleanup
	  }
	}, [initFetch, id]);

	console.log(walk)
  return (

    <div className="detail">
         
		  	<ButtonBack  path="/walk_list"  title="Back"/>
		  
        <div className="">      
      		<DetailWalk walk={walk} />
     	</div>   
      
    </div>   
        
  );
};

export default WalkDetailPage;
