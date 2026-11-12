import { describe,it,expect } from 'vitest'; import request from 'supertest'; import app from './server';
describe('health',()=>{it('returns service health',async()=>{const r=await request(app).get('/health'); expect(r.status).toBe(200); expect(r.body.ok).toBe(true);});});

