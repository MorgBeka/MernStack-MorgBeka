import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import { useParams } from 'react-router';
import {Link } from 'react-router-dom';

import ButtonHeart from '../buttons/ButtonHeart';
import { ButtonBack} from '..';

import './Detail.scss';

const DetailDog = ({dog, shelter}) => {
		  console.log(dog);
  return (
		<div>
			{!!dog 
			? 
				<div className="detail">
					
				
					<img className="imgDetail" src={dog.imageUrl}/>
					

		           	<div className="info">
					   <div className="heartDetail">
					 	 <ButtonHeart  id="heart" title="Heart"/>
						</div>
		              <h1 className="nameDetail">{dog.name}</h1>

		              <table>
		                   <tr>
		                       <td className="title">Geslacht:</td>
		                       <td className="content">{dog.gender}</td>
		                   </tr> 
		                   <tr>
		                       <td className="title">Leeftijd:</td> 
		                       <td className="content">{dog.age}</td>
		                   </tr>
		                   <tr>
		                       <td className="title">Ras:</td>
		                       <td className="content">{dog.breed}</td>
		                   </tr>
		                     
		                   <tr>
		                      <td className="title">Verblijft momenteel:</td>
		                      <td className="content">{dog.stay}</td>
		                   </tr>
		                </table>

		               <p className="infoText">{dog.info}</p>

					   <div className="appointment">
        					<p className="title">Klik hier voor meer info over de verblijfplaats!</p>
        					{/* <NavLink classname="link" to="/shelter_detail"><p>{dog.stay}</p></NavLink> */}

							<Link ><button type='submit' className="a-ButtonFurther" style={{backgroundColor: "#0000"}}>
							<p>{dog.stay}</p>
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



export default DetailDog;

