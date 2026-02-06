# Buda API TS

Cliente en TypeScript para la API REST publica de [buda.com](https://api.buda.com).

Expone una API HTTP simple que:

- consulta mercados de Buda,
- calcula spread por mercado (`min_ask - max_bid`),
- guarda una alerta maxima local por mercado,
- devuelve resultados en JSON.

## Requisitos

- Node.js `>= 18`
- npm `>= 9`

## Instalacion

```bash
npm install
```

## Scripts

```bash
npm run dev          # desarrollo con recarga en caliente (ts-node-dev)
npm run build        # compila TypeScript a dist/
npm start            # ejecuta build compilado
npm test             # tests con Jest
npm run lint         # lint con ESLint
npm run lint:fix     # corrige issues de lint
npm run format       # formatea con Prettier
npm run format:check # valida formato
```

## Endpoints

### `GET /`

Retorna un mensaje simple de conexion y sugiere usar `/api`.

### `GET /api`

Retorna spreads por mercado en formato JSON.

Ejemplo de respuesta:

```json
[
  [
    {
      "market": "btc-clp",
      "max_bid": "10000000.0",
      "min_ask": "10010000.0",
      "spread": 10000,
      "alerta": 10000
    }
  ]
]
```

## Testing

Los tests viven en `tests/` y usan `supertest` contra la app de Express.

```bash
npm test
```

## Notas

- El storage de alertas usa `node-localstorage` en `./scratch`.
- `dist/` es salida de build y no se versiona.
