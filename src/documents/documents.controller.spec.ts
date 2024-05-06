import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let documentsService: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDocuments', () => {
    it('should call documentsService.findAll with the correct arguments', async () => {
      const workspaceId = 'validWorkspaceId';
      const isTemporarilyDeleted = false;
      await controller.getDocuments(workspaceId, isTemporarilyDeleted);
      expect(documentsService.findAll).toHaveBeenCalledWith(workspaceId, isTemporarilyDeleted);
    });
  });

  describe('getDocumentById', () => {
    it('should call documentsService.findOne with the correct arguments', async () => {
      const documentId = 1; 
      await controller.getDocumentById(documentId);
      expect(documentsService.findOne).toHaveBeenCalledWith({ id: documentId });
    });
  });

  describe('createDocument', () => {
    it('should call documentsService.create with the correct arguments', async () => {
      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        emoji: '📝',
        content: 'Sample content',
        workspace: { id: 1 }, 
        coverImageUrl: 'http://example.com/image.jpg', 
        isTemporarilyDeleted: false,
        isPublished: true,
      };
      await controller.createDocument(createDocumentDto);
      expect(documentsService.create).toHaveBeenCalledWith(createDocumentDto);
    });
  });

  describe('updateDocument', () => {
    it('should call documentsService.update with the correct arguments', async () => {
      const documentId = 1; 
      const updateDocumentDto: UpdateDocumentDto = {
        title: 'Updated Document Title',
        emoji: '✏️',
        content: 'Updated content',
        coverImageUrl: 'http://example.com/updated-image.jpg',
        isTemporarilyDeleted: true,
        isPublished: false,
      };
      await controller.updateDocument(documentId, updateDocumentDto);
      expect(documentsService.update).toHaveBeenCalledWith(documentId, updateDocumentDto);
    });
  });

  describe('deleteDocument', () => {
    it('should call documentsService.delete with the correct arguments', async () => {
      const documentId = 1; 
      await controller.deleteDocument(documentId);
      expect(documentsService.delete).toHaveBeenCalledWith(documentId);
    });
  });
});
