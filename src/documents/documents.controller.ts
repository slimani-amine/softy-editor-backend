import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentsService } from './documents.service';
import { Document } from './infrastructure/persistence/relational/entities/document.entity';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuditLog } from 'src/audit/decorators/audit-log.decorator';

@Controller('v1/documents')
@UseGuards(AuthGuard('jwt'))
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments(
    @Query('workspaceId') workspaceId: string,
    @Query('isTemporarilyDeleted') isTemporarilyDeleted: boolean,
  ) {
    return this.documentsService.findAll(workspaceId, isTemporarilyDeleted);
  }

  @Get(':id')
  getDocumentById(@Param('id') id: number) {
    return this.documentsService.findOne({ id });
  }

  @Post()
  @AuditLog('create-document')
  createDocument(@Body() body: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(body);
  }

  @Patch(':id')
  @AuditLog('update-document')
  updateDocument(@Param('id') id: number, @Body() body: UpdateDocumentDto) {
    return this.documentsService.update(id, body);
  }
  @Delete(':id')
  @AuditLog('delete-document')
  deleteDocument(@Param('id') id: number) {
    return this.documentsService.delete(id);
  }
}
