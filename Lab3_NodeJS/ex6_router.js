const http = require("http")
const url = require("url")
const hostname = "localhost"
const port = 3000

const server = http.createServer((req,res) => {
    data = ''
    try {
        data = route(req)
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    } catch(error) {
        console.log(error)
        
        data = "500 - Internal error";
        res.writeHead(500,{"Content-Type":"text/plain"});
    }
    
    res.end(data)
})

function route(req){
    let site = url.parse(req.url,true).pathname
    console.log(site)
    switch(site){
        case '/':
            return `<h1>Home</h1>`;
        case '/about':
            return '<h1>About</h1>'
        default:
            return '<h3>Not Found - 404</h3>'
    }
}

server.listen(port,() => {console.log(`Serwer uruchomiony na: http://${hostname}:${port}`)})