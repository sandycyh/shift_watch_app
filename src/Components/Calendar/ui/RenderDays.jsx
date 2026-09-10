import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import getShift from '@/api/shiftAPI';
import CalendarCSS from './Calendar.module.css';

const shiftTypes = ['AM', 'PM', 'ND'];

const greenIcon = () => <CircleIcon sx={{ color: '#2e7d32', fontSize: '0.7rem' }} />;
const redIcon = () => <CircleIcon sx={{ color: '#ef1010', fontSize: '0.7rem' }} />;
const orangeIcon = () => <CircleIcon sx={{ color: '#ff8800', fontSize: '0.7rem' }} />;

const getShiftStatus = (shiftData) => {
    if (!shiftData) return { color: '#ff8800', label: 'No data' };

    const planned = Number(shiftData.planned_staff);
    const actual = Number(shiftData.actual_staff);

    if (!Number.isFinite(planned) || !Number.isFinite(actual)) {
        return { color: '#ff8800', label: 'Pending' };
    }

    if (actual < planned) return { color: '#ef1010', label: 'Understaffed' };
    if (actual === planned) return { color: '#2e7d32', label: 'On target' };
    return { color: '#ff8800', label: 'Over target' };
};

export default function RenderDays({ daysInMonth, firstDay, handleOpen, currentDate }) {
    const [dayStatusMap, setDayStatusMap] = React.useState({});

    React.useEffect(() => {
        const loadDayStatuses = async () => {
            const statuses = {};

            for (let day = 1; day <= daysInMonth; day += 1) {
                const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const results = await Promise.all(
                    shiftTypes.map((shiftType) => getShift(dateString, shiftType))
                );

                statuses[day] = {};
                shiftTypes.forEach((shiftType, index) => {
                    statuses[day][shiftType] = getShiftStatus(results[index]);
                });
            }

            setDayStatusMap(statuses);
        };

        loadDayStatuses();
    }, [currentDate, daysInMonth]);

    try {
        let days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        for (let i = 0; i < firstDay; i++) {
            days.unshift(null);
        }

        days.push(days.shift());
        days.pop();

        return days.map((day, index) => {
            if (!day) {
                return <div key={`empty-${index}`} className={CalendarCSS.gridItem} aria-hidden="true" />;
            }

            const statusEntries = dayStatusMap[day] || {};

            return (
                <div
                    key={day}
                    className={CalendarCSS.gridItem}
                    onClick={() => handleOpen(day)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleOpen(day);
                        }
                    }}
                >
                    <div className={CalendarCSS.dayCellContent}>
                        <div className={CalendarCSS.dayNumber}>{day}</div>
                        <div className={CalendarCSS.shiftSummary}>
                            {shiftTypes.map((shiftType) => {
                                const status = statusEntries[shiftType] || { color: '#ff8800', label: 'Pending' };
                                const icon =
                                    status.color === '#2e7d32' ? greenIcon() :
                                    status.color === '#ef1010' ? redIcon() : orangeIcon();

                                return (
                                    <span
                                        key={`${day}-${shiftType}`}
                                        className={CalendarCSS.shiftStatus}
                                        title={`${shiftType}: ${status.label}`}
                                    >
                                        {icon}
                                        {shiftType}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}


