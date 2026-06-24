const http = require('http');
const fs = require('fs');
const path = require('path');
const types = { '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.html': 'text/html' };

http.createServer((request, response) => {
  const requestedPath = request.url === '/' ? 'index.html' : decodeURIComponent(request.url).replace(/^\/+/, '');
  const filePath = path.join(process.cwd(), requestedPath);
  if (!filePath.startsWith(process.cwd())) { response.writeHead(403); response.end(); return; }
  fs.readFile(filePath, (error, content) => {
    response.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(filePath)] || 'text/plain' });
    response.end(error ? 'Not found' : content);
  });
}).listen(4173, '127.0.0.1', () => console.log('Jojo Bakes preview: http://127.0.0.1:4173'));
