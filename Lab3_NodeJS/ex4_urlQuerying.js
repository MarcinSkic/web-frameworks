const http = require('http')
const { parse } = require('path')
const url = require('url')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    //This line is unnecessarily complicated but I love it!
    let {a,b,c} = (({a,b,c}) => ({a: +a, b: +b, c: +c}))(url.parse(req.url, true).query) 
    
    let p = (a+b+c)/2;
    let area = Math.sqrt(p*(p-a)*(p-b)*(p-c))

    let txt = ""
    if(Number.isNaN(p)){
        txt = "Podano nie poprawne argumenty";
    } else {
        txt = `Trojkat o bokach ${a} ${b} ${c} ma pole = ${area}`;
    }
    
    res.end(txt)
}).listen(3000)