/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from '@health/health.module';
import { mockE2EEnvironmentVariables } from '@common/test/_mocks_';

describe('Health E2E Tests', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => mockE2EEnvironmentVariables],
        }),
        TerminusModule,
        HealthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
      { bufferLogs: true },
    );

    app.enableVersioning({ type: VersioningType.URI });

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /v1/health/check', () => {
    it('should return health check status 200 when all checks pass', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/health/check')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('details');
      expect(response.body.details).toHaveProperty('memory_heap');
      expect(response.body.details.memory_heap).toHaveProperty('status', 'up');
    });

    it('should have correct response structure', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/health/check')
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: expect.stringMatching(/^(ok|error|shutting_down)$/),
          info: expect.any(Object),
          error: expect.any(Object),
          details: expect.any(Object),
        }),
      );
    });

    it('should handle multiple concurrent requests', async () => {
      const requests = [
        request(app.getHttpServer()).get('/v1/health/check').expect(200),
        request(app.getHttpServer()).get('/v1/health/check').expect(200),
      ];

      const responses = await Promise.all(requests);

      const response1 = responses[0];
      const response2 = responses[1];

      expect(response1.body.status).toBe(response2.body.status);
      expect(Object.keys(response1.body)).toEqual(Object.keys(response2.body));
    });

    it('should respond with correct content type', async () => {
      await request(app.getHttpServer())
        .get('/v1/health/check')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('Health Check Memory Details', () => {
    it('should include memory heap check in details', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/health/check')
        .expect(200);

      expect(response.body.details.memory_heap).toEqual(
        expect.objectContaining({
          status: expect.stringMatching(/^(up|down)$/),
        }),
      );
    });
  });

  describe('Invalid Routes', () => {
    it('should return 404 for non-existent health endpoints', async () => {
      await request(app.getHttpServer()).get('/v1/health/invalid').expect(404);
    });

    it('should return 404 for health check without version', async () => {
      await request(app.getHttpServer()).get('/health/check').expect(404);
    });
  });
});
