import React, { useEffect, useState } from 'react';
import './styles/EventDetails.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    // Expect eventName to be a string like '20250713_poolparty'
    const eventName = typeof location.state?.event === 'string' ? location.state.event : null;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!eventName) {
            setError('No event selected');
            setLoading(false);
            return;
        }
        fetch(`http://localhost:3001/api/events/${eventName}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setEvent(data[0]);
                } else {
                    setError('Event not found');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load event details');
                setLoading(false);
            });
    }, [eventName]);

    if (loading) return (
        <FormWindow>
            <FormBody>
                <div className="loading-message">Loading event details...</div>
            </FormBody>
        </FormWindow>
    );
    if (error) return (
        <FormWindow>
            <FormBody>
                <div className="error-message">{error}</div>
            </FormBody>
        </FormWindow>
    );
    if (!event) return null;

    return (
        <FormWindow>
            <FormBody>
                <h2 className="event-name">{event.name}</h2>
                <div className="top-row">
                    <div className="event-logo">LOGO</div>
                    <div className="event-data">
                        <h4>Event Details</h4>
                        <div className="data-section">
                            <div>
                                <strong>Start</strong><br />
                                Date: {event.date}<br />
                                Time: {event.time}<br />
                                Place: <span>{event.place}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map-section">
                    <label>Route Map</label>
                    <div className="route-map">496 x 120</div>
                </div>
                <div className="buttons-row">
                    <button className="Exit" onClick={() => navigate('/EventSelector')}>
                        Cancel
                    </button>
                    <button className="Manage">Manage Registrations</button>
                    <button className="Start">Start Event</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}