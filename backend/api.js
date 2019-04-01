const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


var router = express.Router();

// variable for storing db instance
var db = null;
// initializing mongodb
MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, database) {
  if (err) throw err;
  db = database.db("NotificationTest");
});


/**
 * Route for fetching user info
 */
router.get('/user/:userId', function(req, res) {
  db.collection("UserProfiles").findOne( { Username: req.params.userId }, (error, result) => {
    res.send(result);
  });
});

/**
 * route for login user
 */
router.post('/login', function(req, res) {
  db.collection("UserProfiles").findOne( req.body, (error, result) => {
    res.send(result);
  });
});

/**
 * route for register user
 */
router.post('/register', function(req, res) {
  db.collection("UserProfiles").findOne( { Username: req.body.Username }, (error, result) => {
    console.log(result);
    if(result !== null) {
      res.send(false);
    }
    else {
      db.collection("UserProfiles").insertOne(req.body, (error, insertResult) => {
        res.send(insertResult);
      });
    }
  });

});

/**
 * get current user information
 */
router.get('/notification/:userId', function(req, res) {
  db.collection("Notifications").find({ UserId: req.params.userId }).sort({ Date: -1 }).toArray((error, result) => {
    res.send(result);
  });
});

/**
 * get notifications of user
 */
router.get('/notification/:userId/:notificationId', function(req, res) {
  db.collection("Notifications").find({ UserId: req.params.userId, _id: new ObjectId(req.params.notificationId) }).sort({ Date: -1 }).toArray((error, result) => {
    console.log(result);
    res.send(result);
  });
});

/**
 * add new notification
 */
router.post('/notification', function(req, res) {
  db.collection("Notifications").insertOne(req.body, (error, result) => {
    console.log(result);
    if(result !== null)
      res.send(result.ops[0]);
  });
});

/**
 * update notification
 */
router.put('/notification', function(req, res) {
  let condition = { _id: new ObjectId(req.body._id) };
  let changes = { $set: { Header: req.body.Header, Body: req.body.Body, Category: req.body.Category, IsClosed: req.body.IsClosed } };
  db.collection("Notifications").updateOne(condition, changes, (error, result) => {
    if(result !== null)
      res.send(true);
  });
});

/**
 * delete notification
 */
router.delete('/notification/:notificationId', function(req, res) {
  let condition = { _id: new ObjectId(req.params.notificationId) };
  db.collection("Notifications").deleteOne(condition, (error, result) => {
    console.log(result);
    if(result !== null)
      res.send(true);
  });
});

/**
 * General route for testing
 */
router.route('/')
    .get(function(req, res, next) {
  res.send('API Works!');
})
    .post(function(req, res, next) {
  res.send('API Works! body => ' + JSON.stringify(req.body));
});

module.exports = router;
