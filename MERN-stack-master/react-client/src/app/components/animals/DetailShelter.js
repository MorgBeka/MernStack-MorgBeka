import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import { useParams } from 'react-router';

import ButtonHeart from '../buttons/ButtonHeart';

import './Detail.scss';

const DetailShelter = ({shelter}) => {

	  console.log(shelter);

  return (
	<div>
		{!!shelter
		?
			<div className="detailShelter">

			<div className="image">
				<img className="img" src={shelter.imageUrl}/>
			</div>
				<div className="info">
				<div className="heartDetail">
					 	 <ButtonHeart color="pink" title="Heart"/>
						</div>
				<div className="title">
		              <h1 className="nameDetail">{shelter.name}</h1>
					</div>
					<p className="infoText">{shelter.info}</p>
				</div>

				<div className="information">   
					<p className="title">Waar vind je ons?</p>
						<table>
						   <tr>
							   <td className="title">Adres:</td>
							   <td className="content">{shelter.place}</td>
						   </tr> 
						   <tr>
							   <td className="title">Telefoon:</td> 
							   <td className="content">{shelter.phone}</td>
						   </tr>
					   		<tr>
							   <td className="title">Nummer:</td>
							   <td className="content">{shelter.email}</td>
						   </tr> 
						</table>

						<p className="title">Openingsuren:</p>
						<p className="infoText__shelter">{shelter.openinghours}</p> 
				</div>
				</div>
				:<h1>Loading...</h1>
		}

		</div>
	);
};



export default DetailShelter;
