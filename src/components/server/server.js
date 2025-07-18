const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const Papa = require('papaparse');

const app = express();
const eventsDir = path.join(__dirname, 'events');

app.use(cors());
app.use(express.static('events'));

// List all events
app.get('/api/events', async (req, res) => {
    try {
        const folders = await fs.readdir(eventsDir);
        const events = [];

        for (const folder of folders) {
            const folderPath = path.join(eventsDir, folder);
            const stat = await fs.stat(folderPath);
            if (!stat.isDirectory()) continue;

            // Extract date and event name from folder name
            const match = folder.match(/^(\d{8})_(.+)$/);
            let eventDate = 'Unknown', eventName = folder;
            if (match) {
                eventDate = match[1];
                eventName = match[2];
            }

            const csvPath = path.join(folderPath, `${folder}.csv`);
            let date = eventDate, time = 'Unknown', place = 'Unknown';

            try {
                const csvData = await fs.readFile(csvPath, 'utf8');
                const parsed = Papa.parse(csvData, { header: true, delimiter: ';', skipEmptyLines: true });
                const firstRow = parsed.data[0];
                if (firstRow) {
                    date = firstRow.date || eventDate;
                    time = firstRow.time || 'Unknown';
                    place = firstRow.place || 'Unknown';
                }
            } catch {
                // CSV not found or unreadable
            }

            events.push({
                folder, // actual folder name for lookup
                name: eventName,
                date,
                time,
                place,
                csvPath: `/${folder}/${folder}.csv`,
                logoPath: `/${folder}/logo.png`
            });
        }

        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error reading events folder' });
    }
});
// Get event details from CSV
app.get('/api/events/:eventName', async (req, res) => {
    const eventName = req.params.eventName;
    const csvFile = path.join(eventsDir, eventName, `${eventName}.csv`);

    try {
        const data = await fs.readFile(csvFile, 'utf8');
        const parsed = Papa.parse(data, { header: true, delimiter: ';', skipEmptyLines: true });
        res.json(parsed.data);
    } catch {
        res.status(404).json({ error: 'Event CSV not found' });
    }
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));