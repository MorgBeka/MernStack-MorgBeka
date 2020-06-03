import { default as React } from 'react';

import './ConfirmationLayout.scss';
import { Footer } from '../components/footer';


const ConfirmationLayout = ({children}) => {
  return (
    <div className="page-conformation">
      {children}

      <Footer />
    </div>
  );
};

export default ConfirmationLayout;
