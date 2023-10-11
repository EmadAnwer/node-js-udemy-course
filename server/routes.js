const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(url);
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
	  <html>
		  <head>
			  <title>Enter Message</title>
		  </head>
		  <body>
			  <h1>This is Emad's Server first page</h1>
			  <form action="/message" method="POST">
				  <input type="text" name="message">
				  <button type:"submit">Send</button>
			  </form>
		  </body>
	  </html>
	  `);
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const message = Buffer.concat(body).toString().split('=')[1];
      console.log(message);
      fs.writeFile('messages.txt', message, () => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
