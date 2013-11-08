var http = require('http');
var fs = require('fs');
var url = require('url');

var longitude = '', latitude = '';

http.createServer(function(request, response){ // myFunction(5);
	console.log(request.url);
	if(request.url.indexOf('/post') >= 0) {
		var urlParts = url.parse(request.url, true);
		var query = urlParts.query;
		console.log(query);
		latitude = query.latitude;
		longitude = query.longitude;
		response.end();
	}
	else if(request.url.indexOf('/get') >= 0) {
		response.end(JSON.stringify({ latitude: latitude, longitude: longitude }));
	}
	else {
		fs.readFile('public' + request.url, function(error, data){
			response.setHeader("Content-Type", "text/html");
			response.end(data);
		});
	}
}).listen(8000);