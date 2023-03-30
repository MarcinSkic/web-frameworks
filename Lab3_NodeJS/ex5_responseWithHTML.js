const http = require('http');

const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    res.end(`<h1>Aplikacja w Node</h1>
<h2>To jest odpowiedź HTML</h2>
<ol>
    <li></li>
    <li></li>
    <li></li>
</ol>`);
});
server.listen(port, () => { console.log(`Serwer uruchomiony na: http://${hostname}:${port}`); });
