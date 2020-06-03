import { default as React } from 'react';

import './ListLayout.scss';
import { Footer } from '../components/footer';

const ListLayout = ({children}) => {
  return (
    <div className="page-list">
      {children}
     

    <Footer />
    </div>
  );
};

export default ListLayout;
