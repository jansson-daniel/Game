const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.resolve(__dirname, '../dist');
const proxy = httpProxy.createProxyServer({ changeOrigin: true, ws: true });
const server = http.createServer(app);
const bundle = require('../dist/index.js');

bundle();

app.use(express.static(publicPath));

// Result endpoint
app.get('/winner', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    // generate random numbers
    const result = [
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6)
    ];

    // check number of each items
    const nItems = result.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let typeOfWin = 'No win';
    let bonus = false;

    // Type of win depending on number of each item
    for (let num in nItems) {
        if (nItems.hasOwnProperty(num)) {
            if (parseInt(nItems[num]) === 2) typeOfWin = 'Small win';
            if (parseInt(nItems[num]) > 2) typeOfWin = 'Big win';
        }
    }

    // if small or big win - bonus
    if (typeOfWin === 'Big win' || typeOfWin === 'Small win') {
        bonus = Math.round(Math.random()) === 1;
    }

    res.send({ result: result.join(' '), win: typeOfWin, bonus });
});

app.all('/build/*', (req, res) => {
  proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
  });
});

server.listen(port, () => {
  console.log('Server running on port ' + port);
});

