import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';

export default function Home() {
    const navigate = useNavigate();

    return (
        <FormWindow>
            <FormBody>
                {/* Logo */}
                <img
                    src="/cronostera.svg"
                    alt="Logo"
                    style={{
                        height: '200px',
                        display: 'block',
                        margin: '-20px auto 40px',
                        width: 'auto'
                    }}
                />

                {/* Buttons */}
                <div className="buttons-container">
                    <button className="Exit">
                        Exit
                    </button>
                    <button
                        className="Start"
                        onClick={() => navigate('/EventSelector')}
                    >
                        Start
                    </button>
                </div>
            </FormBody>
        </FormWindow>
    );
}