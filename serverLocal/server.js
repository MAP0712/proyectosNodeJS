const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
    let pathName = url.parse(req.url).pathname;
    console.log(pathName);
    res.statusCode = 200;
    res.setHeader = ('Content-Type','text/plain');
    res.end('Hello world\n');
});

server.listen(port,hostname,()=>{
    console.log(`Servidor arrancado en http://${hostname}:${port}`);
})
