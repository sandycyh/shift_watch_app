import React from "react";
import Spacer from '../Components/Spacer.jsx';
import Calendar from "../Components/Calendar/ui/Calendar.jsx";
import Footer from "../Components/Footer.jsx";
import LogAShift from './LogAShift';

export default function Dashboard() {
    const [isLogOpen, setIsLogOpen] = React.useState(false);
    const [calendarRefreshKey, setCalendarRefreshKey] = React.useState(0);

    const handleShiftSaved = () => {
        setCalendarRefreshKey((prev) => prev + 1);
        setIsLogOpen(false);
    };

    return (
        <>
            <section id="center">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '18px',
                    marginBottom: '28px'
                }}>
                    <button
                        type="button"
                        onClick={() => setIsLogOpen(true)}
                        style={{
                            background: 'linear-gradient(135deg, #2c7ef7 0%, #1d5ecb 50%, #154da8 100%)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '14px',
                            padding: '14px 30px',
                            fontSize: '1rem',
                            fontWeight: 800,
                            letterSpacing: '0.03em',
                            cursor: 'pointer',
                            minWidth: '190px',
                            marginTop: '10px',
                            boxShadow: '0 14px 28px rgba(29, 94, 203, 0.28), inset 0 1px 0 rgba(255,255,255,0.25)',
                            transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
                            filter: 'drop-shadow(0 6px 12px rgba(21, 77, 168, 0.18))'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 18px 32px rgba(29, 94, 203, 0.34), inset 0 1px 0 rgba(255,255,255,0.25)';
                            e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(21, 77, 168, 0.24))';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 14px 28px rgba(29, 94, 203, 0.28), inset 0 1px 0 rgba(255,255,255,0.25)';
                            e.currentTarget.style.filter = 'drop-shadow(0 6px 12px rgba(21, 77, 168, 0.18))';
                        }}
                    >
                        Log a shift
                    </button>
                </div>
                <Spacer size="10px" />
                <div>
                    <Calendar refreshKey={calendarRefreshKey} />
                </div>
            </section>

            <LogAShift open={isLogOpen} onClose={handleShiftSaved} />
            <Footer />
        </>
    );
}