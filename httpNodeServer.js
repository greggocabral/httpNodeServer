var http = require('http');
var fs = require('fs');
// var puerto = process.argv[2];
var path = require('path');
var url = require('url');
 
var server = http.createServer(function(request, response) {
    
    var destino;
    if (request.url === '/') {
        destino = '/index.html';
    } else {
        destino = request.url;
    }

    

    if (path.extname(destino) === ""){
        response.writeHead(400, {
            'Content-Type': 'text/html'
        });
        var stream = fs.createReadStream('invalid.html');
        stream.pipe(response);
    }
    else{
        fs.open('.' + destino, 'r', function (err, fd){
            if (err){
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                        });
                var stream = fs.createReadStream('notFound.html');
                stream.pipe(response);
            }
            else{
                fs.close(fd, function(){
                    response.writeHead(200, {
                    'Content-Type': 'text/html'
                        });
                    var stream = fs.createReadStream('.' + destino);
                    stream.pipe(response);

                });
            }
        })    

    }

 
    
});
 
server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function() {
    console.log('Escuchando requests');
});

// server.listen(puerto, function(){
//     console.log('escuchando');
// });