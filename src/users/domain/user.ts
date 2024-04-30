import { Exclude, Expose } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { Role } from '../../roles/domain/role';
import { Status } from '../../statuses/domain/status';
import { Plan } from 'src/plans/domain/plan';

export class User {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  userName?: string | null;
  photo?: string | null;
  // photo?: FileType | null;
  role?: Role | null;
  status?: Status;
  plan?: Plan;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
