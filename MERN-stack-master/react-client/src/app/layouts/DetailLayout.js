import { default as React } from 'react';

import './DetailLayout.scss';
import { Footer } from '../components/footer';


const DetailLayout = ({children}) => {
  return (
    <div className="page-detail">
      {children}

      <Footer />
    </div>
  );
};

export default DetailLayout;
