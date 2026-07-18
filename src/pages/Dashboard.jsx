import React from "react";
import Button from '../Components/Button.jsx';
import Spacer from '../Components/Spacer.jsx';
import Calendar from "../Components/Calendar/ui/Calendar.jsx";
import Footer from "../Components/Footer.jsx";

import shiftWatchLogo from '../assets/icon.png';


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
            
            

            <Footer />

        </>
    );
}