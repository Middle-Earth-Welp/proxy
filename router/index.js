const router = require('express').Router();
const axios = require('axios');

router.route('/fetchRestaurant/:id')
  .get((req, res) => {
    axios.get(`http://54.215.152.242:3000/api/fetchRestaurant/${req.params.id}`)
    .then(({data})=> {
      res.status(200).send(data);
    }).catch(err => {
      res.status(400).send(err);
    })
  });

router.route('/fetchRestaurant')
  .post((req, res) => {
    axios.post('http://54.215.152.242:3000/api/fetchRestaurant', req.body)
    .then(() => {
      res.status(200).send();
    }).catch(err => {
      res.status(400).send(err);
    })
  })

module.exports = {
  router: router
};
