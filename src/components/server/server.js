// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const eventsDir = path.join(__dirname, 'events');

app.use(cors());
app.use(express.static('events'));

app.get('/api/events', (req, res) => {
    fs.readdir(eventsDir, (err, folders) => {
        if (err) return res.status(500).json({ error: 'Error reading events folder' });

        const result = folders
            .filter(folder => fs.statSync(path.join(eventsDir, folder)).isDirectory())
            .map(folder => ({
                name: folder,
                csvPath: `/${folder}/${folder}.csv`,
                logoPath: `/${folder}/logo.png`
            }));

        res.json(result);
    });
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));
