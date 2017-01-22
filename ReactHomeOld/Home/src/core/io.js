import http from 'http';
import io from 'socket.io';

var httpServer = http.Server(process.server);
var socketIo = io(httpServer);

httpServer.listen(3005, function(){
	console.log('listening on *:3005');
});

export default socketIo;