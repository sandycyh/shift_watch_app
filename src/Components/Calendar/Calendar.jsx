import React, { useState } from "react";

const Calendar = () => {

    const [ currentDate, setCurrentDate ] = useState(new Date());

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

        for (let i = 1; i <= daysInMonth; i++){
            days.push(i)
        }; 

        for (let i = 0; i < firstDay; i++) {
            days.unshift();
        }

        return days;
        // return days.map((Day, index) => (
        //     <div key={index} style={{ padding: 6}}>
        //         {day ?? ""}
        //     </div>
        // )); 
    };


    //function to navigate to month
    const goToCurrentMonth = () => {
        setCurrentDate(new Date());
    };

    return (
        <div>
            <h2>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <div>
                {renderDays()}
                </div>
        </div>
    );
}

export default Calendar;