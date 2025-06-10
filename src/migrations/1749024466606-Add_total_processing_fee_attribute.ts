import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalProcessingFeeAttribute1749024466606
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cart
      ADD COLUMN processing_fee_total INTEGER DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cart
      DROP COLUMN processing_fee_total
    `);
  }
}
