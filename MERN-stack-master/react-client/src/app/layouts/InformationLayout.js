import { default as React } from 'react';

import './InformationLayout.scss';
import { Footer } from '../components/footer';


const InformationLayout = ({children}) => {
  return (
    <div className="page-information">
      {children}    

     <Footer />
     </div>

  );
};

export default InformationLayout;
