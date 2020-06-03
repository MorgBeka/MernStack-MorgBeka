import { default as React} from 'react';
import { Button } from '../../components';

import { logo } from '../../assets/images';


const WelcomePage = () => {
  return (
    <div className="welcome">
		

		
		<div className="background">
			<img id="logo" src={logo} alt="img"></img>
		</div>

		<div className="login__buttons">
			<Button path="/login" title="MELD AAN" color="white" />
			<Button path="/signin" title="NIEUW  ACCOUNT" color="white" />
		</div>

      
    </div>
  );
};

export default WelcomePage;
