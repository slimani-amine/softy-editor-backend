import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest';

describe('WorkspacesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/workspaces (GET)', () => {
    return request(app.getHttpServer()).get('/v1/workspaces').expect(200);
  });

  it('/v1/workspaces/:id (GET)', async () => {
    const workspaceId = 1;
    return request(app.getHttpServer())
      .get(`/v1/workspaces/${workspaceId}`)
      .expect(200);
  });

  it('/v1/workspaces (POST)', async () => {
    const createWorkspaceDto = {
      title: 'Test Workspace',
      emoji: '🚀',
      creator_id: 1,
      user: { id: 1 },
      members: [],
      documents: [],
    };
    return request(app.getHttpServer())
      .post('/v1/workspaces')
      .send(createWorkspaceDto)
      .expect(201);
  });

  it('/v1/workspaces/:id (PATCH)', async () => {
    const workspaceId = 1;
    const updateWorkspaceDto = {
      title: 'Updated Workspace Title',
      emoji: '🌟',
      members: [{ id: 2 }, { id: 3 }],
    };
    return request(app.getHttpServer())
      .patch(`/v1/workspaces/${workspaceId}`)
      .send(updateWorkspaceDto)
      .expect(200);
  });

  it('/v1/workspaces/:id (DELETE)', async () => {
    const workspaceId = 1;
    return request(app.getHttpServer())
      .delete(`/v1/workspaces/${workspaceId}`)
      .expect(200);
  });
});
