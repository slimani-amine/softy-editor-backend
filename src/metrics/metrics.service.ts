import client from 'prom-client';
import express from 'express';

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

const app = express();

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  const Registry = client.Registry;
  const register = new Registry();
  collectDefaultMetrics({ register });

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, '0.0.0.0', () => {
    console.info('Metrics server started at http://localhost:9100');
  });
}
