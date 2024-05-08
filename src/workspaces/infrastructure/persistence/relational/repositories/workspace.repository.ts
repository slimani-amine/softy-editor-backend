import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EntityCondition } from '../../../../../utils/types/entity-condition.type';
import { Workspace } from '../entities/workspace.entity';
import { WorkspaceRepository } from '../../workspace.repository';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { InviteMembersDto } from 'src/workspaces/dto/inviteMembers.dto';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class WorkspaceRelationalRepository implements WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspacesRepository: Repository<Workspace>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
    private mailService: MailService,
  ) {}

  async create(data: Workspace, user: JwtPayloadType): Promise<Workspace> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const userId = +user.id;
    data.members = [{ id: userId }];
    data.creator_id = userId;

    const newEntity = await this.workspacesRepository.save(
      this.workspacesRepository.create(data),
    );
    return newEntity;
  }
  async findAll(user: JwtPayloadType): Promise<Workspace[] | null> {
    const userId = +user.id;

    const entities = await this.workspacesRepository
      .createQueryBuilder('workspace')
      .innerJoinAndSelect('workspace.members', 'member')
      .getMany();

    const filteredEntities = entities.filter((workspace) => {
      return workspace.members.some((member) => member.id === userId);
    });

    return filteredEntities.length ? filteredEntities : null;
  }

  async findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>> {
    const entity = await this.workspacesRepository.findOne({
      where: fields as FindOptionsWhere<Document>,
      relations: ['members'],
    });
    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    return entity;
  }

  async update(
    id: Workspace['id'],
    payload: Partial<Workspace>,
  ): Promise<Workspace> {
    const entity = await this.workspacesRepository.findOne({
      relations: ['members'],
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    entity.updatedAt = new Date();

    const updatedEntity = await this.workspacesRepository.create({
      ...entity,
      ...payload,
    });
    const save = await this.workspacesRepository.save(updatedEntity);

    return updatedEntity;
  }

  async inviteMembers(
    id: number,
    payload: InviteMembersDto,
  ): Promise<Workspace> {
    const workspace = await this.workspacesRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    if (!payload.emails || payload.emails.length === 0) {
      throw new BadRequestException('No emails provided');
    }
    const creator = await this.usersRepository.findOne({
      where: { email: payload.emails[payload.emails.length - 1] },
    });
    const invitedMembers: { id: number }[] = [];
    for (const email of payload.emails) {
      const invited = await this.usersRepository.findOne({ where: { email } });
      if (creator?.email !== email) {
        const hash = crypto
          .createHash('sha256')
          .update(randomStringGenerator())
          .digest('hex');

        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
          infer: true,
        });

        const token = await this.jwtService.signAsync(
          {
            workspaceId: id,
            invitedEmail: email,
            hash: hash,
          },
          {
            secret: this.configService.getOrThrow('auth.secret', {
              infer: true,
            }),
            expiresIn: tokenExpiresIn,
          },
        );

        await this.mailService.inviteMember({
          to: email,
          data: {
            token,
            tokenExpires: Number(tokenExpiresIn),
            from: creator?.email,
            workspaceName: workspace.title,
          },
        });
      }
      if (invited) {
        invitedMembers.push({ id: invited?.id });
      }
    }
    workspace.members = workspace.members || [];
    workspace.members = [...workspace.members, ...invitedMembers];
    await this.workspacesRepository.save(workspace);
    return workspace;
  }

  async Delete(id: Workspace['id']): Promise<void> {
    const entity = await this.workspacesRepository.findOne({
      where: { id: Number(id) },
    });
    if (!entity) {
      throw new NotFoundException('workspace not found');
    }
    await this.workspacesRepository.remove(entity);
  }
}
