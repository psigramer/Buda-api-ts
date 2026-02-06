import { updateAlert } from './alert.service';
import { getMarketIds, getTicker } from './buda.service';

import type { SpreadResponse } from '../types/buda';

export async function getSpreadResults(): Promise<SpreadResponse> {
  const marketIds = await getMarketIds();
  const results: SpreadResponse = [];

  for (let index = 0; index < marketIds.length; index++) {
    const marketId = marketIds[index];
    if (!marketId) {
      continue;
    }

    const ticker = await getTicker(marketId);
    const spread = Number(ticker.min_ask[0]) - Number(ticker.max_bid[0]);
    const alerta = updateAlert(index, spread);

    if (spread === alerta) {
      console.log(`Alert on: ${ticker.market_id}|max spread: ${alerta}`);
    }

    results.push([
      {
        market: ticker.market_id,
        max_bid: ticker.max_bid[0],
        min_ask: ticker.min_ask[0],
        spread,
        alerta,
      },
    ]);
  }

  return results;
}
