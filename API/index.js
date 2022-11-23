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

// let selectedBrandsCheck = new Map();

// for (var i = 0; i < selectedBrands.length; i++) {
//   selectedBrandsCheck.set(selectedBrands[i], false);
// }

function fetchData(json) {
  let phones = [];
  json = require('./brands.json');
  //get all phones with the brands in 'selectedBrands'
  for (var i = 0; i < json.length; i++) {
    if (selectedBrands.includes(json[i].name)) {
      console.log(json[i].url);
      // selectedBrandsCheck[json[i].name].
    }
    // phones.push(json[i].title);
  }
  return phones;
}

app.get('/', (req, res) => {
  res.send(fetchData('t'));
  // fetch('https://gsmarena-api.herokuapp.com/brands')
  //   .then((res) => res.json())
  //   .then((json) => {
  //     res.send(fetchData(json));
  //   });
});

app.get('/test', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
