import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Button ({ text, to = '/' }) {
    const navigate = useNavigate(); 
    return (
        <button
            type="button"
            onClick={() => navigate(to)}>
            { text }
        </button>
    );
}