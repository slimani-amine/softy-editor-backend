import { DeepPartial } from 'typeorm';
import { EntityCondition } from '../../../utils/types/entity-condition.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Workspace } from './relational/entities/workspace.entity';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { InviteMembersDto } from 'src/workspaces/dto/inviteMembers.dto';

export abstract class WorkspaceRepository {
  abstract create(
    data: Omit<Workspace, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
    user: JwtPayloadType,
  ): Promise<Workspace>;

  abstract findOne(
    fields: EntityCondition<Workspace>,
  ): Promise<NullableType<Workspace>>;

  abstract findAll(user: JwtPayloadType): Promise<Workspace[] | null>;

  abstract update(
    id: Workspace['id'],
    payload: DeepPartial<Workspace>,
  ): any;

  abstract Delete(id: Workspace['id']): Promise<number>;

  abstract inviteMembers(
    id: Workspace['id'],
    payload: InviteMembersDto,
  ): Promise<Workspace>;
}
