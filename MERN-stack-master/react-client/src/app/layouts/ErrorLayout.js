import React, { } from 'react';

import './ErrorLayout.scss';

const ErrorLayout = ({ children }) => {

  return (
    <div class="error-page">
      <main class="main">
        {children}
      </main>
    </div>    
  )
};
export default ErrorLayout;
