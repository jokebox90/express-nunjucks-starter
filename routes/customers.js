// routes\customers.js
const express = require('express');
const dbo = require('../dbconn');
const router = express.Router();

router.get('/', function(req, res, next) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("customers")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render(
        "customers.njk",
        {
          title: "Bonjour, voici la liste des clients !",
          customers: result,
        }
      );
    });


});

module.exports = router;
