import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import { useParams } from 'react-router';

import ButtonHeart from '../buttons/ButtonHeart';

import './Detail.scss';

const DetailWalk = ({walk}) => {
  return (
	<div>
		{!!walk
		?
			<div className="detail">

				<img className="imgDetail" src={walk.imageUrl} />

				<div className="info">
					<div className="heartDetail">
					 	 <ButtonHeart  id="heart" title="Heart"/>
						</div>
						<h1 className="nameDetail">{walk.name}</h1>
						<p className="infoText">{walk.info}</p>
					</div>

					<div className="information">     
						   
						<table>
						   <tr>
							   <td className="title">Duur:</td>
							   <td className="content">{walk.durationTime} uur</td>
						   </tr> 
						   <tr>
							   <td className="title">Wandelafstand:</td> 
							   <td className="content">{walk.distance} km</td>
						   </tr>
						   <tr>
							   <td className="title">Startplaats:</td>
							   <td className="content">{walk.startingPoint}</td>
						   </tr>
						</table>
					</div>
					</div>
				:<h1>Loading...</h1>
		}
	</div>
  );
};



export default DetailWalk;
