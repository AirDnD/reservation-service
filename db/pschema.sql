
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR (35) NOT NULL
-- );

-- CREATE TABLE hosts (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id)
-- );

-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY,
--   total_reviews INTEGER DEFAULT 0,
--   avg_rating NUMERIC DEFAULT 0
-- );

-- CREATE TABLE listings (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(500) NOT NULL,
--   host_id INTEGER REFERENCES hosts(id),
--   review_id INTEGER REFERENCES reviews(id),
--   weekly_views INTEGER DEFAULT 0,
--   min_stay INTEGER DEFAULT 3,
--   max_guests INTEGER,
--   fees INTEGER DEFAULT 0,
--   tax_rate INTEGER,
--   rate INTEGER NOT NULL
-- );

CREATE TABLE booked_dates (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listings(id), 
  check_in text NOT NULL,
  check_out text NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER REFERENCES users(id),
  booked_dates_id INTEGER NOT NULL REFERENCES booked_dates(id),
  total_adults INTEGER NOT NULL,
  total_pups INTEGER DEFAULT 0,
  total_charge INTEGER NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- COPY users(id, username) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/usersSample.csv' DELIMITER ',' CSV;
-- COPY reviews(id, total_reviews, avg_rating) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/reviewsSample.csv' DELIMITER ',' CSV;
-- COPY hosts(id, user_id) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/hostsSample.csv' DELIMITER ',' CSV;
-- COPY listings(id, name, host_id, review_id, weekly_views, min_stay, max_guests, fees, tax_rate, rate) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/listingsSample.csv' DELIMITER ',' CSV;
-- COPY booked_dates(id, listing_id, check_in, check_out) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/bookedSample.csv' DELIMITER ',' CSV;
-- COPY reservations(id, guest_id, booked_dates_id, total_adults, total_pups, total_charge) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/reservationsSample.csv' DELIMITER ',' CSV;