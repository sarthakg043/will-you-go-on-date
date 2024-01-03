const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = socketIO(server);


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS,
    },
});

const mailOptions = {
    from: {
        name: "Sarthak Gupta",
        address: process.env.MY_EMAIL,
    },
    to: ["sarthak22bcy54@iiitkottayam.ac.in"],
    subject: "Hello using Nodemailer and Gmail ✔",
    text: "Hello world",
    html: "<b>Hello world💋</b>",
};

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error);
    }
};

// Define a route to handle the button click
app.post('/send-email', (req, res) => {
    sendMail(transporter, mailOptions);
    res.json({ success: true });
});

// Set up a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// IO Socket for browser reload
io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for a disconnect event (server restart)
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Send a message to the client to reload the page
        io.emit('reload');
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
