import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EventSelector.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';
import Papa from 'papaparse';

export default function EventSelector() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then(res => res.text())
            .then(csvText => {
                const results = Papa.parse(csvText, { header: true, delimiter: ';' });
                const dataWithId = results.data.map((item, index) => ({ id: index.toString(), ...item }));
                setEvents(dataWithId);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load events');
                setLoading(false);
            });
    }, []);


    const handleAccept = () => {
        if (selectedEvent) {
            navigate('/EventDetails', { state: { event: selectedEvent } });
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
                            aria-expanded={dropdownOpen}
                            onClick={() => setDropdownOpen(prev => !prev)}
                        >
                            {selectedEvent?.name || 'Select Event'}
                        </button>
                        {dropdownOpen && (
                            <ul className="dropdown-list" role="listbox">
                                {events.map(event => (
                                    <li
                                        key={event.id}
                                        role="option"
                                        aria-selected={selectedEvent?.id === event.id}
                                        className={selectedEvent?.id === event.id ? 'selected' : ''}
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setDropdownOpen(false);
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
                        disabled={!selectedEvent}
                    >
                        Accept
                    </button>
                </div>
                {loading && <div className="loading-message">Loading events...</div>}
                {error && <div className="error-message">{error}</div>}
                <div className="buttons-container">
                    <button className="Exit" onClick={() => navigate('/')}>Cancel</button>
                    <button className="Start" onClick={() => navigate('/NewEventForm')}>New party</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}