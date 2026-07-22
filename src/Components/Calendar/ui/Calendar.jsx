import React, { useState } from "react";
import RenderWeekDays from './RenderWeekDays';
import CalendarHeader from './CalendarHeader';
import CalendarCSS from './Calendar.module.css';
import RenderDays from "./RenderDays";
import DayModal from "../DayModal/DayModal";

const Calendar = () => {
    const sampleData = [
        { shiftID: 'S001', date: '2026-07-10', shiftType: 'AM', planned: 9, actual: 8 },
        { shiftID: 'S002', date: '2026-07-10', shiftType: 'PM', planned: 8, actual: 8 },
        { shiftID: 'S003', date: '2026-07-09', shiftType: 'ND', planned: 5, actual: 4 },
    ];
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

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

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const handleOpen = (day, currentMonth) => {
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
                        handleOpen={handleOpen} 
                        />
                    <br />
                </div>
                <div>
                    <DayModal
                        open={open}
                        onClose={handleClose}
                        day={selectedDay}
                        month={currentDate.toLocaleString('default', { month: 'long' })}
                        year={currentDate.getFullYear()}
                    />
                </div>
            </div>
        </>
    );
}

export default Calendar;