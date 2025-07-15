import React, { useState } from 'react';
import './styles/NewEventForm.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';
import { useNavigate } from 'react-router-dom';

export default function NewEventForm() {
    const [form, setForm] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        logo: null
    });
    const navigate = useNavigate();

    return (
        <FormWindow>
            <FormBody>
                <input
                    type="text"
                    placeholder="Write the name of the event"
                    className="full-width-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <div className="form-row">
                    <div className="upload-section">
                        <label className="upload-label">upload logo in png format</label>
                        <div className="upload-box">
                            <input
                                type="file"
                                accept="image/png"
                                onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Date of the event"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Time of the event"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Place of the event"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                    </div>
                </div>

                <div className="buttons-row">
                    <button
                        className="Exit"
                        onClick={() => navigate('/EventSelector')}
                    >
                        Cancel</button>
                    <button className="Start">Accept</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}