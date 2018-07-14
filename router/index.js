const router = require('express').Router();
const axios = require('axios');

router.route('/fetchRestaurant/:id')
  .get((req, res) => {
    axios.get(`localhost:3000/api/fetchRestaurant/${req.params.id}`)
    .then(({data})=> {
      res.status(200).send(data);
    }).catch(err => {
      res.status(400).send(err);
    })
  });

router.route('/fetchRestaurant')
  .post()

module.exports = {
  router: router
};
