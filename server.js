// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use cors middleware with specific origin
app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'hex-ai.czka0gu268nv.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123456',
    database: 'HexaAI'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to retrieve data from MySQL
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM TblSign_in';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error querying MySQL database:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Define a route to retrieve data from MySQL for TblSign_up
app.get('/api/signup', (req, res) => {
    const query = 'SELECT * FROM TblSign_Up';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error querying MySQL database:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Define a route to insert data into TblSign_Up
app.post('/api/signup', (req, res) => {
    const { FullName, Email, passwd } = req.body; // Extract data from request body
    const query = 'INSERT INTO TblSign_Up (FullName, Email, passwd) VALUES (?, ?, ?)';
    connection.query(query, [FullName, Email, passwd], (error, results) => {
        if (error) {
            console.error('Error inserting data into MySQL database:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        //res.status(201).send('Data inserted successfully');
        res.status(201).json({ message: 'Data inserted successfully' });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
