const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const bp = require('body-parser')
const app = express();
app.use(bp.json())
const server = http.createServer(app);
const port = 5050;
const io = socketIO(server);

const my_date = "dd-mm-yyyy"
const my_message = "I love you"
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


const sendMail = async (transporter, my_data) => {
    const mailOptions = {
        from: {
            name: "Sarthak Gupta",
            address: process.env.MY_EMAIL,
        },
        to: [process.env.MY_EMAIL_2],
        cc: [process.env.BUBU_EMAIL],
        subject: "Bubu Wants to go on a Date 🥰",
        html: `Bubu wants a date on: <b> ${my_data.dateInput} </b><br>
                <div style="font-family: Arial, sans-serif;">
                    <div style="width: 50%; margin: 50px auto; border: 2px solid #ccc; padding: 20px; border-radius: 10px; position: relative;">
                        <p style="margin: 0; font-style: italic; color: #666; font-size: 16px;">"${my_data.messageInput}"</p>
                        <p style="margin: 10px 0 0 0; font-weight: bold; color: #333; font-size: 14px;">- Urvashi</p>
                    </div>
                </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error);
    }
};

// Define a route to handle the button click
app.post('/send-email', (req, res) => {
    const my_data =  req.body

    console.log(my_data.dateInput, my_data.messageInput)
    sendMail(transporter, my_data);
    res.json({ success: true })

    // Emit reload message only to clients in the appropriate room
    io.to(my_data.roomId).emit('reload');
});

// Set up a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`Client connected: Socket ID - ${socket.id}`);

    // You can access other details of the connected client like IP address, etc.
    const clientDetails = {
        id: socket.id,
        address: socket.handshake.headers['x-forwarded-for'] || socket.handshake.address,
        userAgent: socket.handshake.headers['user-agent'],
        // Add more details as needed
    };
    console.log('Client details:', clientDetails);

    // Join a room specific to the session
    socket.on('join', (roomId) => {
        socket.join(roomId);
    });

    // Leave the room when a client disconnects
    socket.on('disconnect', () => {
        console.log(`Client disconnected: Socket ID - ${socket.id}`);
        // Get the rooms the socket is currently joined to
        const rooms = io.sockets.adapter.rooms;
        // Iterate over the rooms to find the one containing the disconnected socket
        for (const room in rooms) {
            if (rooms.hasOwnProperty(room) && rooms[room].hasOwnProperty(socket.id)) {
                socket.leave(room);
                break; // Once found and left the room, no need to continue iterating
            }
        }
    });
});


// Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});