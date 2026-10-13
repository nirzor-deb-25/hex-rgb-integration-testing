import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/convert integration tests', () => {
  it('returns HTTP 200 and RGB values for red', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: '#FF0000' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).to.deep.equal({ r: 255, g: 0, b: 0 });
  });

  it('returns the correct values for a mixed colour', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: '#123456' })
      .expect(200);

    expect(response.body).to.deep.equal({ r: 18, g: 52, b: 86 });
  });

  it('accepts lowercase input without a hash prefix', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: 'abcdef' })
      .expect(200);

    expect(response.body).to.deep.equal({ r: 171, g: 205, b: 239 });
  });

  it('returns HTTP 400 for invalid hexadecimal characters', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: '#GG0000' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must contain exactly six hexadecimal digits, optionally prefixed with #.'
    });
  });

  it('returns HTTP 400 for an unsupported short colour', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: '#FFF' })
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must contain exactly six hexadecimal digits, optionally prefixed with #.'
    });
  });

  it('returns HTTP 400 when the hex field is missing', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({})
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must be a string.'
    });
  });

  it('returns HTTP 400 when hex is a number', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: 123456 })
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must be a string.'
    });
  });

  it('returns HTTP 400 when hex is null', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({ hex: null })
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must be a string.'
    });
  });

  it('returns HTTP 400 when no request body is provided', async () => {
    const response = await request(app)
      .post('/api/convert')
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Hex colour must be a string.'
    });
  });

  it('returns a JSON error for malformed JSON', async () => {
    const response = await request(app)
      .post('/api/convert')
      .set('Content-Type', 'application/json')
      .send('{"hex":')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).to.deep.equal({
      error: 'Request body must contain valid JSON.'
    });
  });

  it('returns HTTP 404 for an unknown endpoint', async () => {
    await request(app)
      .post('/api/unknown')
      .send({ hex: '#FF0000' })
      .expect(404);
  });
});
