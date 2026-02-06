import axios from 'axios';
import axiosRetry from 'axios-retry';
import https from 'https';

import type { MarketsEnvelope, Ticker, TickerEnvelope } from '../types/buda';

const httpsAgent = new https.Agent({ keepAlive: true });

const httpClient = axios.create({
  httpsAgent,
});

axiosRetry(httpClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

export async function getMarketIds(): Promise<string[]> {
  const response = await httpClient.get<MarketsEnvelope>('https://www.buda.com/api/v2/markets.json', {
    headers: { 'X-Custom-Header': 'foobar' },
  });

  return response.data.markets.map((market) => market.id);
}

export async function getTicker(marketId: string): Promise<Ticker> {
  const response = await httpClient.get<TickerEnvelope>(`https://www.buda.com/api/v2/markets/${marketId}/ticker`);
  return response.data.ticker;
}
