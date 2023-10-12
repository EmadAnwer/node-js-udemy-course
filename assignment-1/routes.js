const requestHandler = (req, res) => {
  const url = req.url;
  let userName = '';

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head>
            <title>
                Root
            </title>
        </head>
        <body>
            <h1>Hello From Root</h1>
            <form action="/create-user" method="POST">
                <input type="text" name="user">
                <button>Say Hello</button>
            </form>
        </body>
    </html>
    `);
    return res.end();
  } else if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head>
            <title>
                Users
            </title>
        </head>
        <body>
            <h1>Hello From Users Page</h1>
            <ul>
              <li>Emad</li>
            </ul>
        </body>
    </html>
    `);
    return res.end();
  } else if (url === '/create-user') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      userName = Buffer.concat(body).toString().split('=')[1];
      res.setHeader('Content-Type', 'text/html');
      res.write(`
    <html>
        <head>
            <title>
                Users
            </title>
        </head>
        <body>
            <h1>Hello ${userName} From Create User Page</h1>
        </body>
    </html>
    `);
      return res.end();
    });
  }
};

module.exports = requestHandler;
