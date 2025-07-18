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
                <div style={{ gridColumn: '1 / span 2', marginTop: 24, display: 'flex', gap: 300 }}>
                    <button className="home-exit">Exit</button>
                    <button className="home-start" onClick={() => navigate('/EventSelector')}>
                        Start
                    </button>
                </div>
            </FormBody>
        </FormWindow>
    );
}
