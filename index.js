const app = require('express')();
const http = require('http').createServer(app);
const path = require('path');
const axios = require('axios');

const config = require(path.resolve(__dirname, 'config.json'));

app.get('/', (req, res) => {
  let code = req.query.code;

  let data = 'code=' + encodeURIComponent(code) +
             '&client_id=' + encodeURIComponent(config.client_secret) +
             '&client_secret=' + encodeURIComponent(config.client_secret) +
             '&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob%3Aauto' +
             '&grant_type=authorization_code';

  let options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
    url: 'https://oauth2.googleapis.com/token',
  }

  console.log(options);

  axios(options).then((response) => {
    console.log(response);

    res.json(response.data);
  })
  .catch((error) => {
    console.log(error.response);

    const response = {
      status: error.response.status,
      statusText: error.response.statusText,
    }

    res.json(response);
  });
});

http.listen(config.port, () => {
  console.log('listening on *:' + config.port);
});
  