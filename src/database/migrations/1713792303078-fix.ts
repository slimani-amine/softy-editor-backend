import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fix1713792303078 implements MigrationInterface {
  name = 'Fix1713792303078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document_entity" ALTER COLUMN "title" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document_entity" ALTER COLUMN "title" SET NOT NULL`,
    );
  }
}
