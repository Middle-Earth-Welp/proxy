const Html = ({ body }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Proxy</title>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default Html;