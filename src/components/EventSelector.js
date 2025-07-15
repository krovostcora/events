import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EventSelector.css';
import {FormWindow} from "./window/FormWindow";
import {FormBody} from "./window/FormBody";

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

export default function EventSelector() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const handleAccept = () => {
        if (selectedItem) {
            console.log('Accepted:', selectedItem);
            setOpen(false);
            navigate('/EventDetails', { state: { event: selectedItem } });
        }
    };

    return (
        <FormWindow>
            <FormBody>
            <div className="top-buttons-row">
                <div className="dropdown-container" style={{ position: 'relative' }}>
                    <button
                        className="dropdown-btn"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {selectedItem || 'Show Options'}
                    </button>
                    {open && (
                        <ul className="dropdown-list">
                            {items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className={selectedItem === item ? 'selected' : ''}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setOpen(false);
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    className="accept-btn"
                    onClick={handleAccept}
                    disabled={!selectedItem}
                >
                    Accept
                </button>
            </div>

            <div className="buttons-container">
                <button className="Exit" onClick={() => navigate('/')}>
                    Cancel
                </button>
                <button className="Start" id="new" onClick={() => navigate('/NewEventForm')}>
                    New party
                </button>
            </div>
</FormBody>
</FormWindow>

    );
}
