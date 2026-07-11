import React from 'react';
import './NavBar.css';

export default function NavBar({ onMenu }) {
    return (
        <header className="navbar">
            <button className="navbar_menu" onClick={onMenu} aria-label="Open Menu">
                ☰
            </button>
            <div className='navbar_brand'>Shift Watch</div>
        </header>
    );
}