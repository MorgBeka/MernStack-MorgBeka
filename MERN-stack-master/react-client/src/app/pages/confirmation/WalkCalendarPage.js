import { default as React} from 'react';
import {Link } from 'react-router-dom';
import { ButtonCalendar } from '../../components';
import { ButtonBack } from '../../components';

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'



import '../../layouts/CalendarLayout'


const WalkCalendarPage = () => {
  return (
    
    <div className="detail">

        <div className="top">
    		  <ButtonBack  path="/dog_list" title="Back"/>
    	  </div>

        <div  className="calendar">
          <Calendar />
        </div>

        <div className="total">
			   <tr className="hour">13u30</tr>
            <td className="hours">
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Korte wandeling" className="button__calendar"/></tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Lange wandeling"  className="button__calendar"/></tr>
            </td>

            <td className="hours">
                <tr className="hour">14u30</tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Korte wandeling" className="button__calendar"/></tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Lange wandeling" className="button__calendar"/></tr>
            </td>
            <td className="hours">
                <tr className="hour">15u30</tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Korte wandeling" className="button__calendar"/></tr>
			    <tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Lange wandeling" className="button__calendar"/></tr>
            </td>
            <td className="hours">
                <tr className="hour">16u30</tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Korte wandeling" className="button__calendar"/></tr>
				<tr className="buttonMake"><	ButtonCalendar path="/adopt_confirmation" title="Lange wandeling" className="button__calendar"/></tr>
            </td>
 
            <p className="other">Past een ander moment beter voor u? Neem zeker contact op met ons!</p>
        </div>


	  
    </div>
  );
};

export default WalkCalendarPage;
