import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { DocumentRepository } from './infrastructure/persistence/document.repository';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let documentRepository: DocumentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: DocumentRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    documentRepository = module.get<DocumentRepository>(DocumentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call documentRepository.create with the correct arguments', async () => {
      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        emoji: '📝',
        content: 'Lorem ipsum',
        workspace: { id: 1 },
        coverImageUrl: 'http://example.com/image.jpg',
        isTemporarilyDeleted: false,
        isPublished: true,
      };
      await service.create(createDocumentDto);
      expect(documentRepository.create).toHaveBeenCalledWith(createDocumentDto);
    });
  });

  describe('findAll', () => {
    it('should call documentRepository.findAll with the correct arguments', async () => {
      const workspaceId = 'validWorkspaceId';
      const isTemporarilyDeleted = false;
      await service.findAll(workspaceId, isTemporarilyDeleted);
      expect(documentRepository.findAll).toHaveBeenCalledWith(workspaceId, isTemporarilyDeleted);
    });
  });

  describe('findOne', () => {
    it('should call documentRepository.findOne with the correct arguments', async () => {
      const fields = { id: 1 }; // Replace with appropriate fields for testing
      await service.findOne(fields);
      expect(documentRepository.findOne).toHaveBeenCalledWith(fields);
    });
  });

  describe('update', () => {
    it('should call documentRepository.update with the correct arguments', async () => {
      const id = 1; // Replace with a valid document ID
      const updateDocumentDto: UpdateDocumentDto = {
        title: 'Updated Document Title',
        emoji: '✏️',
        content: 'Updated content',
        coverImageUrl: 'http://example.com/updated-image.jpg',
        isTemporarilyDeleted: true,
        isPublished: false,
      };
      await service.update(id, updateDocumentDto);
      expect(documentRepository.update).toHaveBeenCalledWith(id, updateDocumentDto);
    });
  });

  describe('delete', () => {
    it('should call documentRepository.delete with the correct arguments', async () => {
      const id = 1; // Replace with a valid document ID
      await service.delete(id);
      expect(documentRepository.Delete).toHaveBeenCalledWith(id);
    });
  });
});
