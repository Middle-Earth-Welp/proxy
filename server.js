const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const Html = require('./client/Html');

const port = 3000;
const server = express();

server.get('/', (req, res) => {
  /**
   * renderToString() will take our React app and turn it into a string
   * to be inserted into our Html template function.
   */
  const body = renderToString(<App />);

  res.send(
    Html({
      body
    })
  );
});

server.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
