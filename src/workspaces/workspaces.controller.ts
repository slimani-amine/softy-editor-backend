import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './infrastructure/persistence/relational/entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiTags } from '@nestjs/swagger';
import { InviteMembersDto } from './dto/inviteMembers.dto';
import { SkipJwtGuard } from 'src/utils/custom-guard';
import { FindManyOptions } from 'typeorm';

@ApiTags('Workspaces')
@Controller('v1/workspaces')
@UseGuards(AuthGuard('jwt'))
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  getWorkspaces(@Request() request) {
    return this.workspacesService.findAll(request);
  }

  @Get(':id')
  @SkipJwtGuard()
  getWorkspaceById(@Param('id') id: number) {
    return this.workspacesService.findOne({ id });
  }

  @Get(':userId')
  @SkipJwtGuard()
  async getUserWorkspaces(@Param('userId') userId: number) {
    const options: FindManyOptions<Workspace> = {
      where: { members: { id: userId } },
      relations: ['members'], 
    };
    return this.workspacesService.findAll(options);
  }

  @Post()
  createWorkspace(
    @Body() body: CreateWorkspaceDto,
    @Request() request,
  ): Promise<Workspace> {
    return this.workspacesService.create(body, request);
  }

  @Put(':id')
  inviteMembers(
    @Body() body: InviteMembersDto,
    @Param('id') id: number,
  ): Promise<Workspace> {
    return this.workspacesService.inviteMembers(id, body);
  }

  @Patch(':id')
  updateWorkspace(@Param('id') id: number, @Body() body: UpdateWorkspaceDto) {
    return this.workspacesService.update(id, body);
  }

  @Delete(':id')
  deleteWorkspace(@Param('id') id: number) {
    return this.workspacesService.delete(id);
  }
}
