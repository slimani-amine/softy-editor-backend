import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('DocumentsController (e2e)', () => {
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

  it('/v1/documents (GET)', async () => {
    return request(app.getHttpServer())
      .get('/v1/documents')
      .query({ workspaceId: 'validWorkspaceId', isTemporarilyDeleted: false })
      .expect(200);
  });

  it('/v1/documents/:id (GET)', async () => {
    const documentId = 1;
    return request(app.getHttpServer())
      .get(`/v1/documents/${documentId}`)
      .expect(200);
  });

  it('/v1/documents (POST)', async () => {
    const createDocumentDto = {
      title: 'Test Document',
      emoji: '📝',
      content: ['Lorem ipsum'],
      workspace: { id: 'validWorkspaceId' },
      coverImageUrl: 'http://example.com/image.jpg',
      isTemporarilyDeleted: false,
      isPublished: true,
    };
    return request(app.getHttpServer())
      .post('/v1/documents')
      .send(createDocumentDto)
      .expect(201);
  });

  it('/v1/documents/:id (PATCH)', async () => {
    const documentId = 1;
    const updateDocumentDto = {
      title: 'Updated Document Title',
      emoji: '✏️',
      content: ['Updated content'],
      coverImageUrl: 'http://example.com/updated-image.jpg',
      isTemporarilyDeleted: true,
      isPublished: false,
    };
    return request(app.getHttpServer())
      .patch(`/v1/documents/${documentId}`)
      .send(updateDocumentDto)
      .expect(200);
  });

  it('/v1/documents/:id (DELETE)', async () => {
    const documentId = 1;
    return request(app.getHttpServer())
      .delete(`/v1/documents/${documentId}`)
      .expect(200);
  });
});
