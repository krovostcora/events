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

    function formatFolderName(name, date) {
        const cleaned = name.toLowerCase().replace(/\s+/g, '');
        const formattedDate = date.replaceAll('-', '');
        return `${formattedDate}_${cleaned}`;
    }

    async function handleAccept() {
        const folderName = formatFolderName(form.name, form.date);
        const csvContent = `name;date;time;place\n${form.name};${form.date};${form.time};${form.location}`;

        const folderHandle = await window.showDirectoryPicker(); 
        const eventFolder = await folderHandle.getDirectoryHandle(folderName, { create: true });

        const csvFile = await eventFolder.getFileHandle(`${folderName}.csv`, { create: true });
        const writable = await csvFile.createWritable();
        await writable.write(csvContent);
        await writable.close();

        if (form.logo) {
            const logoFile = await eventFolder.getFileHandle('logo.png', { create: true });
            const logoWritable = await logoFile.createWritable();
            await logoWritable.write(await form.logo.arrayBuffer());
            await logoWritable.close();
        }

        navigate('/EventSelector');
    }

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
                            type="date"
                            placeholder="Date of the event"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                        <input
                            type="time"
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
                    <button className="Exit" onClick={() => navigate('/EventSelector')}>Cancel</button>
                    <button className="Start" onClick={handleAccept}>Accept</button>
                </div>
            </FormBody>
        </FormWindow>
    );
}
