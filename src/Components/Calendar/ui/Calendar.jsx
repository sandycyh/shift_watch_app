import React, { useEffect, useState } from "react";
import RenderWeekDays from './RenderWeekDays';
import CalendarHeader from './CalendarHeader';
import CalendarCSS from './Calendar.module.css';
import RenderDays from "./RenderDays";
import DayModal from "../DayModal/DayModal";

const Calendar = () => {

    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState(currentDate);


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

    const getMonth = (date) => {
        return new Date(date.getMonth());
    }

    const getYear = (date) => {
        return new Date(date.getFullYear());
    }

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const handleOpen = (day) => {
        const date = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth(), 
            day
        )
        setSelectedDay(day);
        setSelectedDate(date);
        setOpen(true);
    };


    const handleClose = (day) => {
        setOpen(false);
    }

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
                    <RenderDays 
                        daysInMonth={daysInMonth} 
                        firstDay={firstDay}
                        handleOpen={handleOpen} 
                        />
                    <br />
                </div>
                <div>
                    <DayModal
                        open={open}
                        onClose={handleClose}
                        selectedDate={selectedDate}
                        // month={currentDate.toLocaleString('default', { month: 'long' })}
                        // year={currentDate.getFullYear()}
                    />
                </div>
            </div>
        </>
    );
}

export default Calendar;