import React from 'react';
import './styles/EventDetails.css';
import { FormWindow } from './window/FormWindow';
import { FormBody } from './window/FormBody';
import { useNavigate } from 'react-router-dom';

export default function EventDetails() {
    const navigate = useNavigate();

    return (
        <FormWindow>
            <FormBody>
                <h2 className="event-name">Nombre carrera</h2>

                <div className="top-row">
                    <div className="event-logo">LOGO</div>

                    <div className="event-data">
                        <h4>Datos</h4>
                        <div className="data-section">
                            <div>
                                <strong>SALIDA</strong><br />
                                Fecha: dd/MM/yyyy<br />
                                Hora: HH:mm<br />
                                Lugar: <a href="/">Población</a>
                            </div>
                            <div>
                                <strong>LLEGADA</strong><br />
                                *Salida y llegada mismo sitio<br />
                                Otra info
                            </div>
                        </div>
                    </div>
                </div>

                <div className="map-section">
                    <label>Recorrido</label>
                    <div className="route-map">496 x 120</div>
                </div>

                <div className="buttons-row">
                    <button className="Exit" onClick={() => navigate('/EventSelector')}>
                        Cancelar
                    </button>
                    <button className="Manage">Gestionar inscripciones</button>
                    <button className="Start">Cronometrar</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}
