# Reservation Service for Airpnp

> Booking module allows user to see general listing details, vacancies in a month, and make a reservation by choosing check-in/check-out dates on a calendar, and specify number of guests.

## Related Projects

  - https://github.com/fullstakreaktor/hero-photo-service
  - https://github.com/fullstakreaktor/Review-service
  - https://github.com/fullstakreaktor/about-service
  - https://github.com/fullstakreaktor/kony-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

- Node 6.13.0
- Mysql 5.7.22 

## Development

### Setting Up 

To create database of mock data
From within root directory:

```sh
mysql -h localhost -u root 
source db/schema.sql
use reservation
source mock-data/mock_data.sql
```


To install dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm start
```

### API

### To READ reservation information from database by id

```sh
curl -H "Content-Type: application/json" -X GET -d '{"reservation_id: 100"}' http://localhost:3003/api/reservations/:reservation_id
```

### To CREATE a new reservation to database

```sh
curl -H "Content-Type: application/json" -X POST -d '{"guest_id: 1234", "booked_dates_id: 1209", "total_adults: 11", "total_pups: 5", "total_charge: 980.17"}' http://localhost:3003/api/guest/:guest_id/booking/:booked_dates_id/adults/:total_adults/pups/:total_pups/charge/:total_charge
```

### To UPDATE reservation dates in database

```sh
curl -H "Content-Type: application/json" -X PUT -d '{"booked_id: 1211", "check_in: 2018-08-14", "check_out: 2018-08-20"}' http://localhost:3003/api/booking/:booked_id/check_in/:check_in_date/check_out/:check_out_date
```

### To DELETE reservation from database

```sh
curl -H "Content-Type: application/json" -X DELETE -d '{"reservation_id: 1236"}' http://localhost:3003/api/reservations/:reservation_id
```



