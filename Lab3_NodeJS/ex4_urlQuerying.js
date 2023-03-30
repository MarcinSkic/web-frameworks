const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    // This line is unnecessarily complicated but I love it!
    // eslint-disable-next-line max-len, no-shadow
    const { a, b, c } = (({ a, b, c }) => ({ a: +a, b: +b, c: +c }))(url.parse(req.url, true).query);

    const p = (a + b + c) / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));

    let txt = '';
    if (Number.isNaN(p)) {
        txt = 'Podano nie poprawne argumenty';
    } else {
        txt = `Trójkąt o bokach ${a} ${b} ${c} ma pole = ${area}`;
    }

    res.end(txt);
}).listen(3000);
