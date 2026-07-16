import CalendarCSS from './Calendar.module.css';

export default function RenderDays({ daysInMonth, firstDay }) {

    let days = [];

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    };

    for (let i = 0; i < firstDay; i++) {
        days.unshift(null)
    }

    days.push(days.shift());
    days.pop();
    
    return days.map((day, index) => (
        <div key={index} className={CalendarCSS.gridItem}
        // onClick={() => openDay(day)} 
        >
            <p>{day}</p>
        </div >)
    )
};


