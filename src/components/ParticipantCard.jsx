import React, { useState } from 'react';
import { FormWindow } from "./window/FormWindow";
import { FormBody } from "./window/FormBody";
import './styles/ParticipantCard.css';
import { useNavigate } from 'react-router-dom';

const ParticipantCard = () => {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        age: '',
        dni: '',
        email: '',
        phone: '',
        gender: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        const errors = { ...validationErrors };
        if (name === 'name' || name === 'surname') {
            errors[name] = value.trim() === '' ? `${name} is required` : '';
        } else if (name === 'age') {
            errors[name] = value <= 0 ? 'Age must be a positive number' : '';
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errors[name] = value && !emailRegex.test(value) ? 'Invalid email format' : '';
        } else if (name === 'phone') {
            const phoneRegex = /^[0-9]*$/;
            errors[name] = value && !phoneRegex.test(value) ? 'Phone must contain only digits' : '';
        }
        setValidationErrors(errors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder: show alert or do nothing
        alert('Submitted! (not saved)');
    };

    const handleCancel = () => {
        setForm({
            name: '',
            surname: '',
            age: '',
            dni: '',
            email: '',
            phone: '',
            gender: '',
        });
        setValidationErrors({});
    };

    return (
        <FormWindow>
            <FormBody>
                <div className="participant-card">
                    <h2>Register as a Participant</h2>
                    <form className="participant-form" onSubmit={handleSubmit}>
                        <input
                            name="name"
                            placeholder="Name *"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="full-width-input"
                        />
                        {validationErrors.name && <small style={{ color: 'red' }}>{validationErrors.name}</small>}
                        <input
                            name="surname"
                            placeholder="Surname *"
                            value={form.surname}
                            onChange={handleChange}
                            required
                            className="full-width-input"
                        />
                        {validationErrors.surname && <small style={{ color: 'red' }}>{validationErrors.surname}</small>}
                        <input
                            name="age"
                            type="number"
                            placeholder="Age *"
                            value={form.age}
                            onChange={handleChange}
                            required
                            className="full-width-input"
                        />
                        {validationErrors.age && <small style={{ color: 'red' }}>{validationErrors.age}</small>}
                        <input
                            name="dni"
                            placeholder="DNI *"
                            value={form.dni}
                            onChange={handleChange}
                            required
                            className="full-width-input"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="full-width-input"
                        />
                        {validationErrors.email && <small style={{ color: 'red' }}>{validationErrors.email}</small>}
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="full-width-input"
                        />
                        {validationErrors.phone && <small style={{ color: 'red' }}>{validationErrors.phone}</small>}
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="full-width-input"
                        >
                            <option value="">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                        <div style={{ gridColumn: '1 / span 2', marginTop: 24, display: 'flex', gap: 16 }}>
                            <button type="submit" className="form-btn">Submit</button>
                            <button type="button" className="form-btn" onClick={handleCancel} onClick={() => navigate('/EventSelector')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </FormBody>
        </FormWindow>
    );
};

export default ParticipantCard;