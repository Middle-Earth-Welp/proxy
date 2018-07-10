const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

app.get('/:id', (req, res) => {
  let props = {id: req.params.id};
  let components = renderComponents(services);
  res.send(Layout(
    'Proxy',
    App(...components),
    Scripts(Object.keys(services), props)
  ));
});

// For stress testing purposes only
app.get('/api/:id', (req, res) => {
  console.log(req.params.id);
  axios.get(`http://18.144.48.235:3000/api/fetchRestaurant/${req.params.id}`)
  .then(({ data }) => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(400).send(err);
  })
});

// For stress testing purposes only
app.post('/api', (req, res) => {
  axios.post('http://18.144.48.235:3000/api/fetchRestaurant', req.body)
  .then(() => {
    res.status(201).send();
  }).catch(err => {
    res.status(400).send(err);
  })
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});

  // "sidebar": "52.53.174.134",
  // "app": "54.146.31.92"
