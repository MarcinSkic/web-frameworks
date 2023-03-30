const http = require('http');

function processRequest(req, res) {
    const body = 'Witaj na platformie Node!\n';
    const contentLength = body.length;
    res.writeHead(200, {
        'Content-Length': contentLength,
        'Content-type': 'text/plain',
    });
    res.end(body);
}

const server = http.createServer(processRequest);
server.listen(3000, () => console.log('Serwer działa!'));
