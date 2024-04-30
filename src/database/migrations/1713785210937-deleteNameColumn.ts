import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteNameColumn1713785210937 implements MigrationInterface {
  name = 'DeleteNameColumn1713785210937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document_entity" ALTER COLUMN "name" SET DEFAULT 'default_name'`,
    );
    await queryRunner.query(`ALTER TABLE "document_entity" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
    await queryRunner.query(
      `ALTER TABLE "document_entity" ADD "name" character varying NOT NULL`,
    );
  }
}
