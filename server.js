require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const { router } = require('./router');

const app = express();
const port = process.env.PORT || 8000;

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

app.get('/:id', (req, res) => {
  let props = {id: req.params.id};
  let components = renderComponents(services, props);
  res.end(Layout(
    'Proxy',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
