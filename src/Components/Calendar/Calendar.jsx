import React, { useState } from "react";
import CalendarCSS from './Calendar.module.css';

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);

        let days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        };

        for (let i = 0; i < firstDay; i++) {
            days.unshift();
        }


        return (
            days.map(day =>
                <div className={CalendarCSS.gridItem}>
                    <button className={CalendarCSS.gridButton}>{day}</button>
                </div>)
        )
    };


    //function to navigate to month
    const goToCurrentMonth = () => {
        setCurrentDate(new Date());
    };

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <>
            <section className={CalendarCSS.container}>
                <div className={CalendarCSS.header}>
                    <button
                        className={CalendarCSS.button}
                        onClick={goToPreviousMonth}
                    >
                        &#8592;</button>

                    <h2 className={CalendarCSS.title}>
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>

                    <button
                        className={CalendarCSS.button}
                        onClick={goToNextMonth}
                    >
                        &#8594; </button>
                </div >

                <div className={CalendarCSS.calendar}>
                    {renderDays()}
                    <br />

                </div>
            </section>
        </>
    );
}

export default Calendar;