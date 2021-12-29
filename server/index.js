const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let users = -1; //1 instead of 0 to exculde current user from counter
io.on("connection", socket => {
    let newUser = true;

    //welcoming a new user
    socket.emit("notify", "Welcome to QuizApp Chat!");

    //notify others with the new user
    socket.on("notify", user => {
        if (!newUser) return;

        socket.user = user;
        socket.broadcast.emit("notify", `${socket.user} has joined the chat!`);
        
        users++;
        newUser = false;
        io.emit("countUsers", users);
    });

    //broadcast new message
    socket.on("newMsg", data => {
        socket.broadcast.emit("newMsg", data);
    });

    //disconnect user
    socket.on("disconnect", () => {
        if (newUser) return;
        
        socket.broadcast.emit("notify", `${socket.user} has left the chat!`);
        
        users--;
        io.emit("countUsers", users);
    });
});


// Procutions Stuff
if(process.env.NODE_ENV === "production") {
    //render static files
    app.use(express.static(__dirname+"/dist/"));

    // SPA routes
    app.get(/.*./, (_req, res) => {
        res.sendFile(__dirname+"/dist/index.html");
    });
}

const port = process.env.PORT || 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));