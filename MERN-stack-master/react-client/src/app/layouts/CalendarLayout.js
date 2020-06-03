import { default as React } from 'react';

import './CalendarLayout.scss';
import { Footer } from '../components/footer';


const CalendarLayout = ({children}) => {
  return (
    <div className="page-calendar">
      {children}

      <Footer />
    </div>
  );
};

export default CalendarLayout;
