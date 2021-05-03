const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const options={
 cors:true,
 origins:["http://127.0.0.1:3000"],
}
const { Server } = require("socket.io");
const io = new Server(server, options);
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('add_course', (data) =>{
  	console.log("add_course ::", data)
  	socket.broadcast.emit('add_course_complete', {
  		user: data.user,
  		course_id: data.course_id
  	})
  })

  socket.on('add_test_video', (data) =>{
  	console.log("add_test_video ::", data)
  	socket.broadcast.emit('add_test_video_complete', {
  		user: data.user_id,
  		id: data.id
  	})
  })

  socket.on('add_noti_admin', (data) =>{
  	console.log("add_noti_admin ::", data)
  	socket.broadcast.emit('course_noti_from_admin', {
  		title: data.title,
  		content: data.content,
  		course_id: data.course_id,
  		user_id: data.user_id
  	})
  })

  socket.on('add_noti_testvideo_admin', (data) =>{
  	console.log("add_noti_testvideo_admin ::", data)
  	socket.broadcast.emit('video_noti_from_admin', {
  		title: data.title,
  		content: data.content,
  		video_id: data.course,
  		user_id: data.user
  	})
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

