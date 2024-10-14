/*const axios = require('axios');
const nasaToken = 'NHTI7XjuQc8RrXeYoHTu6PNZ5dh8kvEYh5iQc65Q';
const startDate = '2024-10-07'; 
const endDate = '2024-10-11';

//const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${nasaToken}`;
const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY';
axios.get(url)
  .then(response => {
    const data = response.data;
    console.log(`Number of asteroids:`, Object.keys(data.near_earth_objects).length);
  })
  .catch(error => {
    console.error('Error while receiving data:', error);
  });*/
const https = require('https');

const apiKey = 'NHTI7XjuQc8RrXeYoHTu6PNZ5dh8kvEYh5iQc65Q';

const startDate = '2024-10-07';
const endDate = '2024-10-11';  

const options = {
    hostname: 'api.nasa.gov',
    path: `/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`,
    method: 'GET',
    rejectUnauthorized: false
  };

  const req = https.request(options, (res) => {
    let data = '';
  
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log(`Number of asteroids:`, Object.keys(jsonData.near_earth_objects).length);
      } catch (error) {
        console.error('Error while parsing the data:', error);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Error while running request:', error);
  });
  
  req.end();