import React from "react";
import './Dashboard.css';
import Spacer from '../Components/Spacer.jsx';
import Calendar from "../Components/Calendar/ui/Calendar.jsx";
import Footer from "../Components/Footer.jsx";
import LogAShift from './LogAShift';
import CircleIcon from '@mui/icons-material/Circle';

export default function Dashboard() {
    const [isLogOpen, setIsLogOpen] = React.useState(false);
    const [calendarRefreshKey, setCalendarRefreshKey] = React.useState(0);

    const handleShiftSaved = () => {
        setCalendarRefreshKey((prev) => prev + 1);
    };

    return (
        <>
            <section id="center" className="dashboard-page">
                <Spacer size="30px" />
                <div className="dashboard-button-wrap">
                    <button
                        type="button"
                        className="dashboard-cta-button"
                        onClick={() => setIsLogOpen(true)}>
                        Log a shift
                    </button>
                </div>
                <Spacer size="20px" />
                <div>
                    <Calendar refreshKey={calendarRefreshKey} />
                </div>
                <Spacer size="10px" />
                <div className="dashboard-status-legend" aria-label="Shift staffing status legend">
                    <span className="dashboard-status-item">
                        <CircleIcon sx={{ color: '#ef1010', fontSize: '0.8rem' }} />
                        Staffing Ratio Not Met
                    </span>
                    <span className="dashboard-status-item">
                        <CircleIcon sx={{ color: '#2e7d32', fontSize: '0.8rem' }} />
                        Fully Staffed
                    </span>
                    <span className="dashboard-status-item">
                        <CircleIcon sx={{ color: '#ff8800', fontSize: '0.8rem' }} />
                        Shift Not Recorded
                    </span>
                </div>
            </section>

            <LogAShift
                open={isLogOpen}
                onClose={() => setIsLogOpen(false)}
                onSaved={handleShiftSaved}
            />
            <Spacer size="50px" />
            <Footer />
        </>
    );
}