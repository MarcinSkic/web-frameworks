const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const port = 3000;

function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal error');
            return;
        }
        res.writeHead(responseCode, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const site = url.parse(req.url, true).pathname;
    console.log(site);
    switch (site) {
    case '/':
        serveStaticFile(res, '/public/home.html', 'text/html');
        break;
    case '/about':
        serveStaticFile(res, '/public/about.html', 'text/html');
        break;
    case '/pollub':
        serveStaticFile(res, '/public/img/pl.jpg', 'image/jpg');
        break;
    default:
        serveStaticFile(res, '/public/404.html', 'text/html');
        break;
    }
});

server.listen(port, () => console.log(`Serwer działa na porcie: ${port}`));
