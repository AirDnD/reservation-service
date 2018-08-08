CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (35) NOT NULL
);

CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  total_reviews INTEGER DEFAULT 0,
  avg_rating NUMERIC DEFAULT 0
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  host_id INTEGER REFERENCES hosts(id),
  review_id INTEGER REFERENCES reviews(id),
  weekly_views INTEGER DEFAULT 0,
  min_stay INTEGER DEFAULT 1,
  max_guests INTEGER,
  fees INTEGER DEFAULT 0,
  tax_rate INTEGER,
  rate INTEGER NOT NULL
);

CREATE TABLE booked_dates (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES listings(id), 
  check_in DATE NOT NULL,
  check_out DATE NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER REFERENCES users(id),
  booked_dates_id INTEGER NOT NULL,
  total_adults INTEGER NOT NULL,
  total_pups INTEGER DEFAULT 0,
  total_charge INTEGER NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);