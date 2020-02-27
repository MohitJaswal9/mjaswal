var app = require('express')();
var http =  require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
	res.sendfile('webpage6.html');
});

users = [];
io.on('connection',function(socket){
	console.log('A user connected');
	socket.on('setusername',function(data){
		console.log(data);
		if(users.indexOf(data)>-1){
			socket.emit('userexists',data + ' username is already taken!');
		}
		else{
			users.push(data);
			socket.emit('userset', {username : data});
		}
	});
	
	socket.on('msg',function(data){
		io.sockets.emit('newmsg',data);
	});
});

http.listen(5000);
console.log('server running at : 127.0.0.1.5000');