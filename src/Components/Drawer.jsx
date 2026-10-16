import React from 'react';
import { Link } from 'react-router-dom';
import './Drawer.css'; 

export default function Drawer({ open, onClose }) {
    return (
        <>
            <div
                className={`drawer ${open ? 'drawer--open' : ''}`}
                onClick={onClose} />
            <aside className={`drawer ${open ? 'drawer--open' : ''}`}>
                <button className="drawer_close" onClick={onClose}>
                    x
                </button>
                <nav className='drawer_menu'>
                    <Link to='/' onClick={onClose}>Dashboard</Link>
                    <Link to='/reports' onClick={onClose}>Reports</Link>
                </nav>
            </aside>
        </>
    );
}