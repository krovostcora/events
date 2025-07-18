import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';
import './styles/EventDetails.css';

export default function EventDetails() {
    const navigate = useNavigate();
    const location = useLocation();
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

    if (loading || error || !event) {
        return (
            <FormWindow>
                <FormBody>
                    <div className={error ? "error-message" : "loading-message"}>
                        {error || "Loading event details..."}
                    </div>
                </FormBody>
            </FormWindow>
        );
    }

    return (
        <FormWindow>
            <FormBody>
                <h2 className="event-name">{event.name}</h2>
                <div className="top-row">
                    <div className="event-logo">
                        <img
                            src={`http://localhost:3001/${eventName}/logo.png`}
                            alt="Event Logo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-logo.svg.png';
                            }}
                        />
                    </div>
                    <div className="event-data">
                        <div className="data-section">
                            <div>
                                <strong>START</strong><br />
                                Date: {event.date}<br />
                                Time: {event.time}<br />
                                Location: <a href="#">{event.place}</a>
                            </div>
                            <div>
                                <strong>FINISH</strong><br />
                                *Start and finish at the same location<br />
                                Additional info
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttons-row">
                    <button className="Exit" onClick={() => navigate('/EventSelector')}>Cancel</button>
                    <button className="Manage">Manage Registrations</button>
                    <button className="Start" onClick={() => navigate('/ParticipantCard')}>Registrate</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}
