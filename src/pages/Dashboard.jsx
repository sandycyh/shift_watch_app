import React from "react";
import ShiftList from "../Components/ShiftList.jsx";
import Button from '../Components/Button.jsx';
import Spacer from '../Components/Spacer.jsx';
import Calendar from "../Components/Calendar/Calendar.jsx";
import Footer from "../Components/Footer.jsx";

import shiftWatchLogo from '../assets/icon.png';

const sampleData = [
    { shiftID: 'S001', date: '2026-07-10', shiftType: 'AM', planned: 9, actual: 8 },
    { shiftID: 'S002', date: '2026-07-10', shiftType: 'PM', planned: 8, actual: 8 },
    { shiftID: 'S003', date: '2026-07-09', shiftType: 'ND', planned: 5, actual: 4 },
];

export default function Dashboard() {
    return (
        <>
            <section id="center">
                <div className="Header">
                    <img src={shiftWatchLogo} className="base" width="270" height="279" />
                </div>
                <div>
                    <header>Shift Watch</header>
                    <p>Track Shift - Collect Edivence - Drive Change</p>
                    <Spacer size="40px" />
                    <Button text="Log a shift" to="/LogAShift" />
                    <Spacer size="30px" />
                </div>
                <div>
                    <Calendar />
                </div>
            </section>

            {/*testing rendering from DB}*/}
            <div style={{ padding: 16 }}>
                <h1> Shift Record </h1>
                <ShiftList data={sampleData} />
            </div>
            <Footer />

        </>
    );
}