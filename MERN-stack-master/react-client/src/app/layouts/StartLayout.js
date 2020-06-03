import { default as React } from 'react';

import './StartLayout.scss';

const StartLayout = ({children}) => {
  return (
    <div className="page-start">
      {children}
    </div>
  );
};

export default StartLayout;
