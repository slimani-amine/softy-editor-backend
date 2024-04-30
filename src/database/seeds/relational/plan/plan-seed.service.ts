import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEnum } from 'src/plans/plans.enum';
import { PlanEntity } from 'src/plans/infrastructure/persistence/relational/entities/plan.entity';

@Injectable()
export class PlanSeedService {
  constructor(
    @InjectRepository(PlanEntity)
    private repository: Repository<PlanEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: PlanEnum.forTeam,
          name: 'forTeam',
        }),
        this.repository.create({
          id: PlanEnum.forPersonal,
          name: 'forPersonal',
        }),
        this.repository.create({
          id: PlanEnum.forSchool,
          name: 'forSchool',
        }),
      ]);
    }
  }
}
