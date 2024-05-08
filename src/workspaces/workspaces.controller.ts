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
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { WorkspacesService } from './workspaces.service';
import { Workspace } from './infrastructure/persistence/relational/entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
<<<<<<< HEAD
import { AuditLog } from 'src/audit/decorators/audit-log.decorator';
=======
import { ApiTags } from '@nestjs/swagger';
>>>>>>> f9da070ebe74470d8dd4da41d64056da3213d4c9

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
  getWorkspaceById(@Param('id') id: number) {
    return this.workspacesService.findOne({ id });
  }

  @Post()
  @AuditLog('add-workspace')
  createWorkspace(
    @Body() body: CreateWorkspaceDto,
    @Request() request,
  ): Promise<Workspace> {
    return this.workspacesService.create(body, request);
  }

  @Patch(':id')
<<<<<<< HEAD
  @AuditLog('update-workspace')
  updateWorkspace(@Param('id') id: number, @Body() body: UpdateWorkspaceDto) {
=======
  updateWorkspace(@Param('id') id: number, @Body() body: UpdateWorkspaceDto) {    
>>>>>>> f9da070ebe74470d8dd4da41d64056da3213d4c9
    return this.workspacesService.update(id, body);
  }

  @Delete(':id')
  @AuditLog('delete-workspace')
  deleteWorkspace(@Param('id') id: number) {
    return this.workspacesService.delete(id);
  }
}
