require('newrelic');
const express = require('express');
const path = require('path');
const redis = require('redis');
const db = require('../db/db.js');
const dg = require('../dataGen.js');
const utils = require('./utils.js');
const PORT = process.env.PORT || 3003;

const app = express();
const client = redis.createClient();

client.on('error', err => {
  console.log('Error ' + err);
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Listening at port: ' + PORT));

app.get('/api/reservations/:reservationid', (req, res) => {
  let id = req.params.reservationid;
  client.get(id, (err, result) => {
    if(result) {
      res.send(JSON.parse(result));
    } else {
      db.getReservationByReservationId(req.params, (err, result) => {
        if (err) {
          res.status(500).send({err: `Server oopsie ${err}`});
        } else {
          client.setex(id, 60, JSON.stringify(result));
          res.send(result);
        }
      });
    }
  })
});

app.get('/api/listings/:listingId', (req, res) => {
  var id = req.params.listingId;

  client.get(id, (err, result) => {
    if(result) {
      res.send(JSON.parse(result));
    } else {
      db.getListingById(req.params, (err, result) => {
      if (err) {
        res.status(500).send({ err: `Server oopsie ${err}` });
      } else if (result.length === 0) {
        res.status(404).send('No such listing')
      } else {
        db.getReviewsByListingId(result[0].review_id, (err, reviews) => {
            if (err) {
              res.status(500).send({err: `Server oopsie ${err}`})
            } else {
              result[0].reviews = reviews[0];
              client.setex(id, 60, JSON.stringify(result[0]));
              res.send(result[0]);
            }
          });
        }
      });
    }
  });
});

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null;

  if(req.query.targetDate) {
    method = db.getFirstBookedDateAfterTarget;
    const target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
  }

  if(req.query.month) {
    const month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
  }

  let id = req.params.listingId;

  client.get(id, (err, resu) => {
    if(resu) {
      res.send(JSON.parse(resu));
    } else {
      method(data, (err, result) => {
        if(err) {
          res.status(500).send({err: `Server oopsie ${err}`});
        } else {
          //console.log('here');
          client.setex(id, 60, JSON.stringify(result));
          res.send(result);
        }
      });
    }
  });
});

app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
  const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      data.bookedDatesId = result.insertId;
      db.postNewReservation(data, (error, reservation) => {
        if (err) {
          db.deleteBookedDatesById(result.insertId, () => {
            res.status(500).send({ err: 'Failed to post reservation' });
          });
        } else res.status(201).send(reservation);
      });
    }
  });

});
