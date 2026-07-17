import React, { useState } from "react";
import RenderWeekDays from './RenderWeekDays';
import CalendarHeader from './CalendarHeader';
import CalendarCSS from './Calendar.module.css';
import RenderDays from "./RenderDays";
import DayModal from "../DayModal";
//import childmodal and polish up the modal to get it working

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

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

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const handleOpen = (day) => {
        console.log(day)
        setSelectedDay(day);
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
                        handleOpen={handleOpen} />
                    <br />
                </div>
                <div>
                    <DayModal
                        open={open}
                        onClose={handleClose}
                        day={selectedDay}
                    />
                </div>
            </div>
        </>
    );
}

export default Calendar;