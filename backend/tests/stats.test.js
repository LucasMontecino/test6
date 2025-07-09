const request = require('supertest');
const express = require('express');
const fs = require('fs');

jest.mock('../src/utils/stats', () => ({
  mean: jest.fn((arr) => arr.reduce((a, b) => a + b, 0) / arr.length),
}));

describe('GET /api/stats', () => {
  let app;

  const createApp = () => {
    const expressApp = express();
    const statsRoute = require('../src/routes/stats');
    expressApp.use('/api/stats', statsRoute);
    expressApp.use((err, req, res, next) => {
      res.status(500).json({ error: err.message });
    });

    return expressApp;
  };

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return total and averagePrice', async () => {
    const mockItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 20 },
    ];

    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(JSON.stringify(mockItems));

    app = createApp();

    const res = await request(app).get('/api/stats');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      total: 2,
      averagePrice: 15,
      cached: false,
    });
  });

  it('should return 500 if file read files', async () => {
    jest
      .spyOn(fs.promises, 'readFile')
      .mockRejectedValue(new Error('File error'));

    app = createApp();

    const res = await request(app).get('/api/stats');

    expect(res.statusCode).toBe(500);
  });
});
