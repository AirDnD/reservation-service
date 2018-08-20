const Promise = require('bluebird');
const initOptions = {
  promiseLib: Promise
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  user: 'reservation_user',
  host: 'localhost',
  database: 'reservation',
  password: 'root',
};

const db = pgp(connection);

const getListingById = ({ listingId }, callback) => {
  db.any('SELECT * FROM listings WHERE id = $1', [listingId]).then(function(data) {
   callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
};

const getReviewsByListingId = (listingId, callback) => {
  db.any('SELECT * from reviews WHERE id = $1', [listingId]).then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
};

const getBookedDatesByListingId = ([listingId, year, month], callback) => {
  const startDate = [year, month, 1].join('-');
  const endDate = month === 12 ? [Number(year)+1, 1, 1].join('-'): [year, Number(month) + 1, 1].join('-');

  const queryStr = `SELECT check_in, check_out FROM booked_dates WHERE listing_id = $1 AND check_in >= $2 AND check_in < $3 ORDER BY check_in`;
  db.any(queryStr, [listingId, startDate, endDate])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
  //pool.query(queryStr, [listingId, startDate, endDate], callback);
};

const getReservationByReservationId = ({reservationid}, callback) => {
  db.any('SELECT r.id, u.username, b.check_in, b.check_out, r.total_adults, r.total_pups, r.total_charge, r.created_at FROM reservations r INNER JOIN users u ON r.guest_id = u.id INNER JOIN booked_dates b on r.booked_dates_id = b.id where r.id = $1', [reservationid]).then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
}

const getFirstBookedDateAfterTarget = ([listingId, year, month, date], callback) => {
  const startDate = [year, month, date].join('-');
  const endDate = month === 12 ? [Number(year)+1, 1, 1].join('-') : [year, Number(month) + 1, 1].join('-');

  const queryStr = `SELECT check_in FROM booked_dates WHERE listing_id = $1 AND check_in > $2 AND check_in < $3 ORDER BY check_in ASC LIMIT 1`;
  db.any(queryStr, [listingId, startDate, endDate])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
  //pool.query(queryStr, [listingId, startDate, endDate], callback)
};

const postNewBookedDates = (data, callback) => {
  const queryStr = `INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES ($1, $2, $3)`;
  db.any(queryStr, [data.listingId, data.checkIn, data.checkOut])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
  //pool.query(queryStr, [data.listingId, data.checkIn, data.checkOut], callback);
};

const postNewReservation = ({guestId, bookedDatesId, guests, total}, callback) => {
  const queryStr = `INSERT INTO reservations `
    + `(guest_id, booked_dates_id, total_adults, total_pups, total_charge) VALUES ($1, $2, $3, $4, $5)`;
  const values = [guestId, bookedDatesId, guests.adults, guests.pups, total];
  db.any(queryStr, [guestId, bookedDatesId, guests.adults, guests.pups, total])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
  //pool.query(queryStr, [values], callback);
};

const deleteBookedDatesById = ({listingId}, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = $1`;
  db.any(queryStr, [listingId])
  .then(function(data) {
    callback(null, data);
  }).catch(function(err) {
    callback(err, null);
  });
  //pool.query(queryStr, listingId, callback);
};


module.exports = {
  getListingById,
  getReviewsByListingId,
  getReservationByReservationId,
  getBookedDatesByListingId,
  getFirstBookedDateAfterTarget,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
};