import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';
import { FileSchemaClass } from '../../../../../files/infrastructure/persistence/document/entities/file.schema';
import { FileMapper } from '../../../../../files/infrastructure/persistence/document/mappers/file.mapper';
import { Role } from '../../../../../roles/domain/role';
import { Status } from '../../../../../statuses/domain/status';
import { Plan } from 'src/plans/domain/plan';
import { Offer } from 'src/offres/domain/offer';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const user = new User();
    user.id = raw._id.toString();
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.userName = raw.userName;
    user.photo = raw.photo;
    // if (raw.photo) {
    //   user.photo = FileMapper.toDomain(raw.photo);
    // } else if (raw.photo === null) {
    //   user.photo = null;
    // }
    user.role = raw.role;
    user.status = raw.status;
    user.plan = raw.plan;
    user.offer = raw.offer;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    return user;
  }

  static toPersistence(user: User): UserSchemaClass {
    let role: Role | undefined = undefined;

    if (user.role) {
      role = new Role();
      role.id = user.role.id;
    }

    let photo: FileSchemaClass | undefined = undefined;

    // if (user.photo) {
    //   photo = new FileSchemaClass();
    //   photo._id = user.photo.id;
    //   photo.path = user.photo.path;
    // }

    let status: Status | undefined = undefined;
    
    if (user.status) {
      status = new Status();
      status.id = user.status.id;
    }
    
    let plan: Plan | undefined = undefined;
    if (user.plan) {
      plan = new Plan();
      plan.id = user.plan.id;
    }

    let offer: Offer | undefined = undefined;
    if (user.offer) {
      offer = new Plan();
      offer.id = user.offer.id;
    }


    const userEntity = new UserSchemaClass();
    if (user.id && typeof user.id === 'string') {
      userEntity._id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.socialId = user.socialId;
    userEntity.userName = user.userName as string;
    userEntity.photo = user.photo as string;
    userEntity.role = role;
    userEntity.status = status;
    userEntity.plan = plan;
    userEntity.offer = offer;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
