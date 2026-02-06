export type PriceLevel = [string, string];

export interface Market {
  id: string;
}

export interface MarketsEnvelope {
  markets: Market[];
}

export interface Ticker {
  market_id: string;
  max_bid: PriceLevel;
  min_ask: PriceLevel;
}

export interface TickerEnvelope {
  ticker: Ticker;
}

export interface SpreadEntry {
  market: string;
  max_bid: string;
  min_ask: string;
  spread: number;
  alerta: number;
}

export type SpreadResponse = SpreadEntry[][];
