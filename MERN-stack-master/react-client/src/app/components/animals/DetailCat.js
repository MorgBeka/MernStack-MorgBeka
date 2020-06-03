import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import { useParams } from 'react-router';
import {Link } from 'react-router-dom';


import ButtonHeart from '../buttons/ButtonHeart';
import { ButtonBack} from '..';

import './Detail.scss';

const DetailCat = ({cat}) => {
	console.log(cat);
  return (
		<div>
			{!!cat 
			? 
				<div className="detail">
					
					<img className="imgDetail" src={cat.imageUrl}/>
		           	<div className="info">
					   <div className="heartDetail">
					 	 <ButtonHeart  id="heart" title="Heart"/>
						</div>
		              <h1 className="nameDetail">{cat.name}</h1>

		              <table>
		                   <tr>
		                       <td className="title">Geslacht:</td>
		                       <td className="content">{cat.gender}</td>
		                   </tr> 
		                   <tr>
		                       <td className="title">Leeftijd:</td> 
		                       <td className="content">{cat.age}</td>
		                   </tr>
		                   <tr>
		                       <td className="title">Ras:</td>
		                       <td className="content">{cat.breed}</td>
		                   </tr>
		                     
		                   <tr>
		                      <td className="title">Verblijft momenteel:</td>
		                      <td className="content">{cat.stay}</td>
		                   </tr>
		                </table>

		               <p className="infoText">{cat.info}</p>


					   <div className="appointment">
        					<p className="title">Klik hier voor meer info over de verblijfplaats!</p>

							<Link ><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
							<p>{cat.stay}</p>
							</button>
							</Link>	
      					</div>
		           	</div>
					</div>
				 :<h1>Loading...</h1>
			}
		</div>
	);

};



export default DetailCat;

