import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceRepository } from './infrastructure/persistence/workspace.repository';
import { Workspace } from './infrastructure/persistence/relational/entities/workspace.entity';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspacesRepository: WorkspaceRepository) {}

  create(createWorkspaceDto: CreateWorkspaceDto, request): Promise<Workspace> {
    return this.workspacesRepository.create(createWorkspaceDto, request.user);
  }

  findAll(request): Promise<Workspace[] | null> {
    return this.workspacesRepository.findAll(request.user);
  }

  findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>> {
    return this.workspacesRepository.findOne(fields);
  }
  update(
    id: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace | null> {
    console.log("🚀 ~ WorkspacesService ~ updateWorkspaceDto:", updateWorkspaceDto)
    return this.workspacesRepository.update(id, updateWorkspaceDto);
  }

  delete(id: number): Promise<void> {
    return this.workspacesRepository.Delete(id);
  }
}
