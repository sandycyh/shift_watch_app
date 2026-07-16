import React, { useState } from "react";
import RenderWeekDays from './RenderWeekDays';
import CalendarHeader from './CalendarHeader';
import CalendarCSS from './Calendar.module.css';



const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

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
            days.unshift(null)
        }

        days.push(days.shift());

        return (
            days.map(day =>
                <div
                    className={CalendarCSS.gridItem}
                // onClick={() => openDay(day)} 
                >
                    <p>{day}</p>
                </div>)
        )
    };

    return (
        <>
            <div className={CalendarCSS.container}>
                <CalendarHeader
                    currentDate={currentDate}
                    onCurrentMonth={goToCurrentMonth}
                    onPreviousMonth={goToPreviousMonth}
                    onNextMonth={goToNextMonth}
                />
                <div className={CalendarCSS.calendar}>
                    {RenderWeekDays()}
                    {renderDays()}
                    <br />
                </div>
            </div>
        </>
    );
}

export default Calendar;