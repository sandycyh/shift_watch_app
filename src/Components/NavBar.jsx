import React from 'react';
import './NavBar.css';
import shiftWatchLogo from '../assets/icon.png';

export default function NavBar({ onMenu }) {
    return (
        <header className="navbar">
            <button className="navbar_menu" onClick={onMenu} aria-label="Open Menu">
                ☰
            </button>

            <div className="navbar_branding_logo">
                <img src={shiftWatchLogo} alt="Shift Watch logo" className="navbar_logo" />
            </div>
            <div className="navbar_branding">
                <div className="navbar_text">
                    <div className="navbar_brand">Shift Watch</div>
                    <div className="navbar_tagline">Track Shift - Collect Evidence - Drive Change</div>
                </div>
            </div>
        </header>
    );
}