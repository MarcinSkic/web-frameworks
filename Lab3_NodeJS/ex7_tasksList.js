const http = require('http');
const qs = require('querystring');

const items = [];

function show(res) {
    const data = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista Zadań</title>
    </head>
    <body>
        <h1>Lista Zadań</h1>
        <form action="/" method="post">
            <input type="text" name="task" id="task">
        <button type="submit">Dodaj</button>
        <ol>
            ${items.map((i) => `<li>${i}</li>`).join('')}
        </ol>
    </form>
    </body>
    </html>`;

    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    res.end(data);
}

function add(req, res) {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
        const obj = qs.parse(body);
        items.push(obj.task);
        show(res);
    });
}

function badRequest(res) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request!');
}

function notFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found!');
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        switch (req.method) {
        case 'GET':
            show(res);
            break;
        case 'POST':
            add(req, res);
            break;
        default:
            badRequest(res);
            break;
        }
    } else {
        notFound(res);
    }
});

server.listen(3000, () => { console.log('Serwer pracuje'); });
