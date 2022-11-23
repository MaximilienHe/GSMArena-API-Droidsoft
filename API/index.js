const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

const fetch = require('node-fetch');

app.use(express.static('static'));

const selectedBrands = [
  'Asus',
  'Fairphone',
  'Google',
  'Honor',
  'Huawei',
  'Lenovo',
  'Micromax',
  'Microsoft',
  'Motorola',
  'Nokia',
  'Nothing',
  'Nvidia',
  'OnePlus',
  'Oppo',
  'Plum',
  'Realme',
  'Samsung',
  'Sony',
  'TCL',
  'vivo',
  'Wiko',
  'Xiaomi',
  'ZTE',
];

function fetchData(brands) {
  let phones = new Map();
  //get all phones with the brands in 'selectedBrands'
  for (var i = 0; i < brands.length; i++) {
    const brandName = brands[i].name;
    if (selectedBrands.includes(brandName)) {
      // console.log(brands[i].url);
      fetch('https://gsmarena-api.herokuapp.com/brand/' + brands[i].url)
      .then((res) => res.json())
      .then((json) => {
        json = Object.values(json.data);
        let phoneList = [];
        for (var j = 0; j < json.length; j++) {
          phoneList.push(json[j].name);
        }
        phones.set(brandName, phoneList);
      });
    }
  }
  //TODO : problem, phones is empty
  phones.forEach(function(value, key) {
    text += key + ' = ' + value;
  })
  return phones;
}

app.get('/', (req, res) => {
  // res.send(fetchData('t'));
  fetch('https://gsmarena-api.herokuapp.com/brands')
    .then((res) => res.json())
    .then((json) => {
      res.send(fetchData(json));
    });
});

app.get('/test', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
