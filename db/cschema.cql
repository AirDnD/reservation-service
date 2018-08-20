DROP KEYSPACE IF EXISTS reservations;
CREATE KEYSPACE reservations 
WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 3};

USE reservations;

CREATE TABLE information (
  id int PRIMARY KEY,
  username text,
  total_reviews int,
  avg_rating int,
  name text,
  weekly_views int,
  min_stay int,
  max_guests int,
  fees int,
  tax_rate int,
  rate int,
  check_in text,
  check_out text,
  total_adults int,
  total_pups int,
  total_charge int,
);


COPY information(id, username, total_reviews, avg_rating, name, weekly_views, min_stay, max_guests, fees, tax_rate, rate, check_in, check_out, total_adults, total_pups, total_charge) FROM '/Users/amanvaid/Desktop/Hack-Reactor/SDC/reservation-service/csv_files/informationSample.csv' WITH HEADER=false and DELIMITER=',';