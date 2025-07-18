// src/components/server/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Papa = require('papaparse');

const app = express();
const eventsDir = path.join(__dirname, 'events');

app.use(cors());
app.use(express.static('events'));

// List all events
app.get('/api/events', (req, res) => {
    fs.readdir(eventsDir, (err, folders) => {
        if (err) return res.status(500).json({ error: 'Error reading events folder' });

        const events = [];

        folders.forEach(folder => {
            const folderPath = path.join(eventsDir, folder);
            const stat = fs.statSync(folderPath);
            if (!stat.isDirectory()) return;

            const csvPath = path.join(folderPath, `${folder}.csv`);
            const csvData = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, 'utf8') : null;
            let date = 'Unknown', time = 'Unknown', location = 'Unknown';

            if (csvData) {
                const parsed = Papa.parse(csvData, { header: true, delimiter: ';', skipEmptyLines: true });
                const firstRow = parsed.data[0];
                if (firstRow) {
                    date = firstRow.date || 'Unknown';
                    time = firstRow.time || 'Unknown';
                    location = firstRow.location || 'Unknown';
                }
            }

            events.push({
                name: folder,
                date,
                time,
                location,
                csvPath: `/${folder}/${folder}.csv`,
                logoPath: `/${folder}/logo.png`
            });
        });

        res.json(events);
    });
});

// Get event details from CSV
app.get('/api/events/:eventName', (req, res) => {
    const eventName = req.params.eventName;
    const csvFile = path.join(eventsDir, eventName, `${eventName}.csv`);

    fs.readFile(csvFile, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Event CSV not found' });

        const parsed = Papa.parse(data, { header: true, delimiter: ';', skipEmptyLines: true });
        res.json(parsed.data);
    });
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));