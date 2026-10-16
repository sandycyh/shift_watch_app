import { useState } from "react";
import RenderWeekDays from './RenderWeekDays';
import CalendarHeader from './CalendarHeader';
import CalendarCSS from './Calendar.module.css';
import RenderDays from "./RenderDays";
import DayModal from "../DayModal/DayModal";
import LogAShift from "../../../pages/LogAShift";

const Calendar = ({ refreshKey = 0 }) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [editingShift, setEditingShift] = useState(null);
    const [dataRefreshKey, setDataRefreshKey] = useState(0);


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
        const date = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth(), 
            day
        )
        setSelectedDate(date);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    }

    const handleEditShift = (shiftRecord) => {
        if (!shiftRecord) return;

        const date = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        setOpen(false);
        setEditingShift({ ...shiftRecord, date, shift_date: date });
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
                    <RenderDays
                        key={`${refreshKey}-${dataRefreshKey}`}
                        daysInMonth={daysInMonth}
                        firstDay={firstDay}
                        handleOpen={handleOpen}
                        currentDate={currentDate}
                    />
                    <br />
                </div>
                <div>
                    <DayModal
                        key={`${selectedDate.toISOString()}-${refreshKey}-${dataRefreshKey}`}
                        open={open}
                        onClose={handleClose}
                        selectedDate={selectedDate}
                        onEdit={handleEditShift}
                        refreshKey={refreshKey + dataRefreshKey}
                    />
                </div>
            </div>
            {editingShift && (
                <LogAShift
                    open
                    initialData={editingShift}
                    onClose={() => setEditingShift(null)}
                    onSaved={() => setDataRefreshKey((value) => value + 1)}
                />
            )}
        </>
    );
}

export default Calendar;