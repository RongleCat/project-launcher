import http from 'http'
import fs from 'fs'
import path from 'path'

export const port = 3318

function getMimeType(extension) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  }
  return mimeTypes[extension] || 'text/plain'
}

export function startServer() {
  return new Promise((resolve) => {
    http
      .createServer((req, res) => {
        // @ts-ignore
        const filePath = path.join(__dirname, req.url)
        console.log(filePath)

        fs.readFile(filePath, (err, content) => {
          if (err) {
            res.writeHead(404)
            res.end('404 Not Found')
            return
          }
          res.writeHead(200, { 'Content-Type': getMimeType(path.extname(filePath)) })
          res.end(content)
        })
      })
      .listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
        resolve(port)
      })
  })
}
