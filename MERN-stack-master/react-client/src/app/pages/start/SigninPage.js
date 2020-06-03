import { default as React} from 'react';
import { logo } from '../../assets/images';

import { Button } from '../../components';
import { ButtonGoogle} from '../../components';
import { ButtonBack } from '../../components';

import { InputField } from '../../components';


const SinginPage = ({children}) => {
  return (
	  
	<div className="sigin">

		<div className="background-2">
			<img id="logo" src={logo} alt="img"></img>
		</div>

		<div className="top">
			<ButtonBack  path="/" title="Back"/>
		</div>

		<div className="login__form">
			
			<h1 className="titleInputField">UW NAAM</h1>
			<InputField placeholder='Naam' type ='text'/>

			<h1 className="titleInputField">UW E-MAIL</h1>
			<InputField placeholder='E-mail' type ='text'/>

			<h1 className="titleInputField">WACHTWOORD</h1>
			<InputField placeholder='Wachtwoord' type ='password'/>

			<h1 className="titleInputField">BEVESTIG WACHTWOORD</h1>
			<InputField placeholder='Bevestig wachtwoord' type ='password'/>

			<div className="buttonsBottem">
			<Button path="/dog_list" title="REGISTREER" color="white" />
			<ButtonGoogle path="/dog_list" title="MELD AAN MET GOOGLE" color="red" />
			</div>

		</div>

  
	</div>
  );
};

export default SinginPage;
