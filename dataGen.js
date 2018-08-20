const fs = require('fs');
const faker = require('faker');
const readline = require('readline');

//Data Generator for Users
const generateUsers = () => {
  console.log('generating users');
  let out = fs.createWriteStream('./csv_files/usersSample.csv', {flag: 'a'});

  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${faker.internet.userName()}\r\n`, 'utf-8');

    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100);
    }
  }

  out.end();
}

//Data Generator for Hosts
const generateHosts = () => {
  console.log('generating hosts');
  let out = fs.createWriteStream('./csv_files/hostsSample.csv', {flag: 'a'});

  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${randomNumber(10000000, 1)}\r\n`, 'utf-8');

    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100);
    }
  }

  out.end();
}

//Data Generator for Reviews
const generateReviews = () => {
  console.log('generating reviews')
  let out = fs.createWriteStream('./csv_files/reviewsSample.csv', {flag: 'a'});

  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${randomNumber(500, 50)},${randomNumber(5,2)}\r\n`, 'utf-8');

    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100)
    }
  }

  out.end();
}

//Data Generate for Booked_Dates
const generateBooked = () => {
  console.log('generating booked')
  let out = fs.createWriteStream('./csv_files/bookedSample.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    let dates = generateDate();
    out.write(`${i},${randomNumber(10000000, 1)},${dates[0]},${dates[1]}\r\n`, 'utf-8');
    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100);
    }
  }
  out.end();
}

const generateListings = () => {
  const rl = readline.createInterface({
  input: fs.createReadStream('sampleData.csv')
  });

  let out = fs.createWriteStream('./csv_files/listingsSample.csv', {flag: 'a'});

  rl.on('line', (line) => {
    const lineSplit = line.split(',');
    out.write(`${lineSplit[0]},${lineSplit[1]},${randomNumber(10000000, 1)},${randomNumber(10000000, 1)},${randomNumber(60, 10)},${randomNumber(10, 3)},${randomNumber(15, 5)},${randomNumber(20, 10)},${randomNumber(10, 7)},${randomNumber(250, 60)}\r\n`, 'utf-8');
  });
}

//Data Generate for Booked_Dates
const generateReservations = () => {
  console.log('generating reservations')
  let out = fs.createWriteStream('./csv_files/reservationsSample.csv', {flag: 'a'});
  for(var i = 1; i < 10000001; i++) {
    out.write(`${i},${randomNumber(10000000, 1)},${randomNumber(10000000, 1)},${randomNumber(10, 1)},${randomNumber(5, 1)},${randomNumber(2000, 1000)}\r\n`, 'utf-8');
    if(i === 2500000) {
      console.log(25);
    } else if(i === 5000000) {
      console.log(50);
    } else if(i === 7500000) {
      console.log(75);
    } else if (i === 10000000) {
      console.log(100);
    }
  }
  out.end();
}


const generateDate = () => {
  var arr = [];
  var year = randomNumber(2025, 2018);
  var month = randomNumber(12,1);
  var day = randomNumber(18,1);
  var day2 = day + randomNumber(10,3);

  var date1 = `${year}-${appendLeading(month)}-${appendLeading(day)}`;
  var date2 = `${year}-${appendLeading(month)}-${appendLeading(day2)}`;

  arr.push(date1, date2);

  return arr;
}

const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const appendLeading = (val) => {
  if(val < 10) {
    return `0${val}`;
  } else {
    return `${val}`
  }
}

const generateInformation = () => {
  console.log('generating information');
  const rl = readline.createInterface({
  input: fs.createReadStream('sampleData.csv')
  });

  let count = 0;

  let out = fs.createWriteStream('./csv_files/informationSample.csv', {flag: 'a'});

  rl.on('line', (line) => {
    count++;
    let dates = generateDate();
    const lineSplit = line.split(',');
              //    id                userName                    total_reviews             avg_rating            name           weekly_views           min_stay                 max_guests                fees                  tax_rate                     rate               check_in   check_out.     total_adults.        total_pups              total_charge
    out.write(`${lineSplit[0]},${faker.internet.userName()},${randomNumber(1000, 60)},${randomNumber(5, 1)},${lineSplit[1]},${randomNumber(100, 50)},${randomNumber(10, 3)},${randomNumber(10, 7)},${randomNumber(250, 60)},${randomNumber(15, 10)}, ${randomNumber(300, 100)},${dates[0]},${dates[1]},${randomNumber(10,7)},${randomNumber(8,2)},${randomNumber(2000, 1000)} \r\n`, 'utf-8');
    if(count === 2500000) {
      console.log(25);
    } else if(count === 5000000) {
      console.log(50);
    } else if(count === 7500000) {
      console.log(75);
    } else if (count === 10000000) {
      console.log(100);
    }
  });
}

// generateBooked();
// generateUsers();
// generateHosts();
// generateReviews();
// generateListings();
// generateReservations();
// generateInformation();
