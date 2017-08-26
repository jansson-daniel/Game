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

app.get('/winner', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const result = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];

    const map = result.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    let typeOfWin = 'No win';
    let bonus = false;

    for (let type in map) {
        if (parseInt(map[type]) === 2) {
            typeOfWin = 'Small win';
        }

        if (parseInt(map[type]) > 2) {
           typeOfWin = 'Big win';
        }
    }

    if (typeOfWin !== 'No win') {
        bonus = true;
    }

    res.send({ result: result.join(' '), win: typeOfWin, bonus });
});

app.all('/build/*', function (req, res) {
  proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
  });
});

server.listen(port, function () {
  console.log('Server running on port ' + port);
});

