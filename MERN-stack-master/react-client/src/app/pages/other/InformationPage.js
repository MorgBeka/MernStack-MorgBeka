import { default as React} from 'react';
import List from '../../components/animals/List';
import { Header } from '../../components';

import { ButtonLogOut } from '../../components';

import { oscar } from '../../assets/images';
import { caspar } from '../../assets/images';
import { cesar } from '../../assets/images';
import { cleo } from '../../assets/images';
import { RegioGent } from '../../assets/images';
import { RegioKoksijde } from '../../assets/images';
import { RegioRoeselare } from '../../assets/images';
import { gent } from '../../assets/images';
import { knokke } from '../../assets/images';


const InformationPage = ({path}) => {
  return (
    <div className="information_page">
  		
		  <div className="header">
	  		<h1  className="top__title">MORGANE BEKAERT</h1>
		   	<p classname="top__subtitle">morgbeka@student.arteveldehs.be</p>

			   <ButtonLogOut path="./" />

     </div>

      	<div className="BlueComponent">
  			<h1  className="name">MIJN AFSPRAKEN</h1>
	  	</div>

	  	<div className="afspraak">  
				{/* <p>Wandeling op 5/06/2020 om 13u30 met Cesar</p> */}
				<p>Afspraak op 5/06/2020 om 15u30 over Caspar</p>	
		</div>

       <div className="BlueComponent">
  			<h1  className="name">FAVORIETE DIEREN</h1>
	   	</div>

		<div className="squares">
				<img className="square" src={oscar} alt="img"></img>
				<img className="square" src={caspar} alt="img"></img>
				<img className="square" src={cesar} alt="img"></img>
				<img className="square" src={cleo} alt="img"></img>
		</div>

       <div className="BlueComponent">
  			<h1  className="name">OPGESLAGEN WANDELINGEN</h1>
	   	</div>

		<div className="squares">
				<img className="square" src={RegioGent} alt="img"></img>
				<img className="square" src={RegioKoksijde} alt="img"></img>
				<img className="square" src={RegioRoeselare} alt="img"></img>
		
		</div>

       	<div className="BlueComponent">
  			<h1  className="name">ASIELEN IN DE REGIO</h1>
	   	</div>

		<div className="squares">
				<img className="square" src={gent} alt="img"></img>
				<img className="square" src={knokke} alt="img"></img>
		</div>
       
  	</div>

  );
};

export default InformationPage;
