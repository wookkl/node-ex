const http = require("http");
const fs =require("fs")
const server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const html = fs.readFileSync(__dirname + "/index.html");
  res.end(html);
})

server.listen(3000, '127.0.0.1');