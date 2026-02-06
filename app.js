const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios').default;
const https = require('https');
const axiosRetry = require('axios-retry').default;
const { LocalStorage } = require('node-localstorage');

//const pool = require('./polling');
//const main = require('./index');
const cors = require('cors');
app.use(cors());
const localStorage = new LocalStorage('./scratch');

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

const httpsAgent = new https.Agent({ keepAlive: true });

function updateAlert(index, spread) {
  const key = `alerta-${index}`;
  const stored = Number(localStorage.getItem(key) || 0);

  if (spread > stored) {
    localStorage.setItem(key, String(spread));
    return spread;
  }

  return stored;
}

app.get('/api', async (req, res, next) => {
  try {
    const response = await axios.get('https://www.buda.com/api/v2/markets.json', {
      httpsAgent,
      headers: { 'X-Custom-Header': 'foobar' },
    });

    const {
      data: { markets },
    } = response;

    const marketIds = markets.map((market) => market.id);
    const results = [];

    for (let index = 0; index < marketIds.length; index++) {
      const marketId = marketIds[index];
      const tickerResponse = await axios.get(`https://www.buda.com/api/v2/markets/${marketId}/ticker`, {
        httpsAgent,
      });
      const ticker = tickerResponse.data.ticker;
      const spread = Number(ticker.min_ask[0]) - Number(ticker.max_bid[0]);
      const alerta = updateAlert(index, spread);

      if (spread === alerta) {
        console.log(`Alert on: ${String(ticker.market_id)}|max spread: ${alerta}`);
      }

      results.push([
        {
          market: String(ticker.market_id),
          max_bid: ticker.max_bid[0],
          min_ask: ticker.min_ask[0],
          spread,
          alerta,
        },
      ]);
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  console.log('Connected as IP: ' + req.ip +'\n');
  res.send('Connected as IP: ' + req.ip +'\n'+'Please use /api');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'internal_error' });
});

if (require.main === module) {
  app.listen(port, (error) => {
    if (!error) {
      console.log("Server is Successfully Running, \n" + "and App is listening on: \n" + `http://localhost:${port}\n`)
    } else {
      console.log("Error occurred, server can't start", error);
    }
  });
}

  module.exports = app;
