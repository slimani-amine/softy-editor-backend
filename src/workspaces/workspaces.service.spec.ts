import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { Workspace } from './infrastructure/persistence/relational/entities/workspace.entity';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let workspaceRepositoryMock: jest.Mocked<WorkspaceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: WorkspaceRepository,
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

    service = module.get<WorkspacesService>(WorkspacesService);
    workspaceRepositoryMock = module.get<WorkspaceRepository>(WorkspaceRepository) as jest.Mocked<WorkspaceRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call workspace repository create method with correct arguments', async () => {
      const createWorkspaceDto: CreateWorkspaceDto = {
        title: 'Test Workspace',
        emoji: '🚀',
        creator_id: 1,
        user: { id: 1 },
        members: [],
        documents: [],
      };
      const request = { user: { id: 1 } };
      const createdWorkspace: Workspace = { 
        id: 1, 
        creator_id: createWorkspaceDto.creator_id,
        title: createWorkspaceDto.title!,
        emoji: createWorkspaceDto.emoji!,
        createdAt: new Date(), 
        updatedAt: new Date(),
        documents: [],
        members: []
      };

      workspaceRepositoryMock.create.mockResolvedValue(createdWorkspace);

      const result = await service.create(createWorkspaceDto, request);

      expect(result).toEqual(createdWorkspace);
      expect(workspaceRepositoryMock.create).toHaveBeenCalledWith(createWorkspaceDto, request.user);
    });
  });

  describe('findAll', () => {
    it('should call workspace repository findAll method with correct arguments', async () => {
      const request = { user: { id: 1 } };
      const workspaces: Workspace[] = [{ 
        id: 1, 
        creator_id: 1,
        title: 'Test Workspace', 
        emoji: '🚀', 
        createdAt: new Date(), 
        updatedAt: new Date(),
        documents: [],
        members: []
      }];

      workspaceRepositoryMock.findAll.mockResolvedValue(workspaces);

      const result = await service.findAll(request);

      expect(result).toEqual(workspaces);
      expect(workspaceRepositoryMock.findAll).toHaveBeenCalledWith(request.user);
    });
  });

  describe('findOne', () => {
    it('should call workspace repository findOne method with correct arguments', async () => {
      const fields = { id: 1 };
      const workspace: Workspace = { 
        id: 1, 
        creator_id: 1,
        title: 'Test Workspace', 
        emoji: '🚀', 
        createdAt: new Date(), 
        updatedAt: new Date(),
        documents: [],
        members: []
      };

      workspaceRepositoryMock.findOne.mockResolvedValue(workspace);

      const result = await service.findOne(fields);

      expect(result).toEqual(workspace);
      expect(workspaceRepositoryMock.findOne).toHaveBeenCalledWith(fields);
    });
  });

  describe('update', () => {
    it('should call workspace repository update method with correct arguments', async () => {
      const id = 1;
      const updateWorkspaceDto: UpdateWorkspaceDto = { title: 'Updated Workspace', emoji: '🌟' };
      const updatedWorkspace: any = { 
        id, 
        creator_id: 1,
        ...updateWorkspaceDto, 
        createdAt: new Date(), 
        updatedAt: new Date(),
        documents: [],
        members: []
      };

      workspaceRepositoryMock.update.mockResolvedValue(updatedWorkspace);

      const result = await service.update(id, updateWorkspaceDto);

      expect(result).toEqual(updatedWorkspace);
      expect(workspaceRepositoryMock.update).toHaveBeenCalledWith(id, updateWorkspaceDto);
    });

    it('should call workspace repository update method with emoji as empty string if not provided in dto', async () => {
      const id = 1;
      const updateWorkspaceDto: UpdateWorkspaceDto = { title: 'Updated Workspace' };
      const updatedWorkspace: Workspace = { 
        id, 
        creator_id: 1,
        title: updateWorkspaceDto.title!,
        emoji: '', 
        createdAt: new Date(), 
        updatedAt: new Date(),
        documents: [],
        members: []
      };

      workspaceRepositoryMock.update.mockResolvedValue(updatedWorkspace);

      const result = await service.update(id, updateWorkspaceDto);

      expect(result).toEqual(updatedWorkspace);
      expect(workspaceRepositoryMock.update).toHaveBeenCalledWith(id, updateWorkspaceDto);
    });
  });

  describe('delete', () => {
    it('should call workspace repository delete method with correct arguments', async () => {
      const id = 1;

      await service.delete(id);

      expect(workspaceRepositoryMock.Delete).toHaveBeenCalledWith(id);
    });
  });
});
