import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch');

export function updateAlert(index: number, spread: number): number {
  const key = `alerta-${index}`;
  const stored = Number(localStorage.getItem(key) || 0);

  if (spread > stored) {
    localStorage.setItem(key, String(spread));
    return spread;
  }

  return stored;
}
