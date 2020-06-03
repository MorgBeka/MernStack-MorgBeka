import { default as React } from 'react';
import { ButtonBack} from '../../components';


const ConfirmationAdoption = ({img, name, path}) => {
  return (
 <div className="confirmation">

    <img className="imgDetail" src={img}/>
       <div className="confirmationInfo">
       
          <p className="text">We verwelkomen u graag voor een afspraak omtrent  een adoptie! </p>
           
          <p className="text">Indien dit overwachts niet meer lukt voor u, gelieve ons dan te verwittigen via de contactgegevens van ons asiel.</p>

       </div>
  </div>
  );
};



export default ConfirmationAdoption;
