import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './infrastructure/persistence/relational/entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

class Document {}
class UserEntity {}

const createWorkspaceDtoMock: CreateWorkspaceDto = {
  title: 'Test Workspace',
  emoji: '🚀',
  creator_id: 1,
  user: { id: 1 },
  members: [],
  documents: [],
};

const updateWorkspaceDtoMock: UpdateWorkspaceDto = {
  title: 'Updated Workspace',
  emoji: '🌟',
  members: [{ id: 1 }, { id: 2 }],
};

class WorkspaceMock implements Workspace {
  id: number;
  emoji: string;
  title: string;
  creator_id: number;
  documents: any;
  members: { id: number }[];
  createdAt: Date;
  updatedAt: Date;
}

describe('WorkspacesController', () => {
  let controller: WorkspacesController;
  let service: WorkspacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [
        {
          provide: WorkspacesService,
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

    controller = module.get<WorkspacesController>(WorkspacesController);
    service = module.get<WorkspacesService>(WorkspacesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWorkspaces', () => {
    it('should return an array of workspaces', async () => {
      const workspaces: Workspace[] = [new WorkspaceMock()];
      (service.findAll as jest.Mock).mockResolvedValue(workspaces);

      const result = await controller.getWorkspaces({} as any);

      expect(result).toEqual(workspaces);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getWorkspaceById', () => {
    it('should return a workspace by id', async () => {
      const id = 1;
      const workspace: Workspace = new WorkspaceMock();
      (service.findOne as jest.Mock).mockResolvedValue(workspace);

      const result = await controller.getWorkspaceById(id);

      expect(result).toEqual(workspace);
      expect(service.findOne).toHaveBeenCalledWith({ id });
    });
  });

  describe('createWorkspace', () => {
    it('should create a new workspace', async () => {
      (service.create as jest.Mock).mockResolvedValue({} as Workspace);

      const result = await controller.createWorkspace(
        createWorkspaceDtoMock,
        {} as any,
      );

      expect(result).toBeDefined();
      expect(service.create).toHaveBeenCalledWith(
        createWorkspaceDtoMock,
        expect.anything(),
      );
    });
  });

  describe('updateWorkspace', () => {
    it('should update a workspace', async () => {
      (service.update as jest.Mock).mockResolvedValue({} as Workspace);

      const result = await controller.updateWorkspace(
        1,
        updateWorkspaceDtoMock,
      );

      expect(result).toBeDefined();
      expect(service.update).toHaveBeenCalledWith(1, updateWorkspaceDtoMock);
    });
  });

  describe('deleteWorkspace', () => {
    it('should delete a workspace', async () => {
      (service.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.deleteWorkspace(1);

      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
