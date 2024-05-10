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
import { ApiTags } from '@nestjs/swagger';
import { AuditLog } from 'src/audit/decorators/audit-log.decorator';

//
// import { Serialize } from 'src/interceptors/serialize.interceptor';
// import { DocumentDto } from './dto/document.dto';
// @Serialize(DocumentDto)
//
@ApiTags('Document')
@Controller('v1/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @AuditLog('create-document')
  createDocument(@Body() body: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateDocument(@Param('id') id: number, @Body() body: UpdateDocumentDto) {
    return this.documentsService.update(id, body);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteDocument(@Param('id') id: number) {
    return this.documentsService.delete(id);
  }
}
