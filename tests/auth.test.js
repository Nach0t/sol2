const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const axios = require('axios');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  console.log('✅ Mongo Memory Server listo');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
  console.log('🛑 Mongo Memory Server detenido');
});

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

describe('🧪 Autenticación', () => {
  test('Registro exitoso', async () => {
    const res = await api.post('/register', {
      username: 'testUser',
      password: 'testPass123'
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('token');
  });

  test('Login exitoso', async () => {
    const res = await api.post('/login', {
      username: 'testUser',
      password: 'testPass123'
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('token');
  });
});