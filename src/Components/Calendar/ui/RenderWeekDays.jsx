import CalendarCSS from './Calendar.module.css';


const RenderWeekDays = () => {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        weekdays.push(weekdays.shift());
        return (
            weekdays.map((weekday, index) =>
                <div key={index} className={CalendarCSS.weekdays}>
                    <p>{weekday}</p>
                </div>
            )
        )
    }

export default RenderWeekDays;