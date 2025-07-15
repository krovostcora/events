import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './styles/EventSelector.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';

export default function EventSelector() {
    const [open, setOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event;

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    setEvents([]);
                    setError('Events data is not an array');
                }
            })
            .catch(() => {
                setEvents([]);
                setError('Failed to load events');
            });
    }, []);

    const handleAccept = () => {
        if (selectedName) {
            navigate('/EventDetails', { state: { event: selectedName } });
        }
    };

    return (
        <FormWindow>
            <FormBody>
                <div className="top-buttons-row">
                    <div className="dropdown-container">
                        <button
                            className="dropdown-btn"
                            aria-haspopup="listbox"
                            aria-expanded={open}
                            onClick={() => setOpen(prev => !prev)}
                        >
                            {selectedName || 'Show Options'}
                        </button>
                        {open && (
                            <ul className="dropdown-list" role="listbox">
                                {events.map((event, idx) => (
                                    <li
                                        key={event.id || idx}
                                        role="option"
                                        aria-selected={selectedName === event.name}
                                        className={selectedName === event.name ? 'selected' : ''}
                                        onClick={() => {
                                            setSelectedName(event.name);
                                            setOpen(false);
                                        }}
                                    >
                                        {event.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button
                        className="accept-btn"
                        onClick={handleAccept}
                        disabled={!selectedName}
                    >
                        Accept
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="buttons-container">
                    <button className="Exit" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                    <button className="Start" onClick={() => navigate('/NewEventForm')}>
                        New party
                    </button>
                </div>
            </FormBody>
        </FormWindow>
    );
}
