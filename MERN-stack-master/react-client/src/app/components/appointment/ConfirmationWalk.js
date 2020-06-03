import { default as React } from 'react';
import { ButtonBack} from '../../components';


const ConfirmationWalk = ({img, name, path}) => {
  return (
 <div className="confirmation">

    <img className="imgDetail" src={img}/>
       <div className="confirmationInfo">
     
          <p className="text">We verwelkomen u graag voor een wandeling! </p>
           
          <p className="text">Indien dit overwachts niet meer lukt voor u, gelive ons dan te verwittigen via de contactgegevens van ons asiel.</p>

       </div>
  </div>
  );
};



export default ConfirmationWalk;
