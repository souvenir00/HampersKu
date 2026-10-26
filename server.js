const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // Redirect *.html requests to clean URL (except google verification)
  if (reqUrl.endsWith('.html') && reqUrl !== '/index.html' && !reqUrl.startsWith('/google')) {
    const cleanUrl = reqUrl.slice(0, -5);
    res.writeHead(301, { 'Location': cleanUrl });
    res.end();
    return;
  }

  if (reqUrl === '/paket/' || reqUrl === '/paket/index.html' || reqUrl === '/paket') {
    reqUrl = '/paket.html';
  } else if (reqUrl === '/blog/' || reqUrl === '/blog/index.html' || reqUrl === '/blog') {
    reqUrl = '/blog.html';
  } else if (reqUrl === '/penulis/' || reqUrl === '/penulis/index.html' || reqUrl === '/penulis') {
    reqUrl = '/penulis.html';
  } else if (reqUrl === '/hampers-tahun-baru/' || reqUrl === '/hampers-tahun-baru/index.html' || reqUrl === '/hampers-tahun-baru') {
    reqUrl = '/paket/hampers-tahun-baru.html';
  } else if (reqUrl === '/portofolio/' || reqUrl === '/portofolio/index.html' || reqUrl === '/portofolio') {
    reqUrl = '/portofolio.html';
  } else if (reqUrl.endsWith('/')) {
    reqUrl += 'index.html';
  }

  let filePath = path.join(__dirname, reqUrl);

  // If path has no extension and is directory or file
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      const notFoundPath = path.join(__dirname, '404.html');
      if (fs.existsSync(notFoundPath)) {
        res.end(fs.readFileSync(notFoundPath));
      } else {
        res.end('<h1>404 Not Found</h1>');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
