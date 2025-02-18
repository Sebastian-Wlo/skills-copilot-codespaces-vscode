// Create web server
// Use express

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    if (!comment || !comment.id || !comment.author || !comment.content) {
        res.status(400).send('Bad request');
        return;
    }

    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error');
                return;
            }
            res.status(201).send('Created');
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});