import React, { useState } from "react";
import CalendarCSS from './Calendar.module.css';

const CalendarHeader = ({ currentDate, onCurrentMonth, onPreviousMonth, onNextMonth }) => {

    return (
        <div className={CalendarCSS.header}>
            <button className={CalendarCSS.button} onClick={onPreviousMonth}>&#8592;</button>

            <h2 className={CalendarCSS.title}>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>

            <button className={CalendarCSS.button} onClick={onNextMonth}>&#8594;</button>
        </div >
    );
}

export default CalendarHeader;