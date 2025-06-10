import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalProcessingFeeAttributeForOrder1749025158826
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "order"
      ADD COLUMN processing_fee_total INTEGER DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "order"
      DROP COLUMN processing_fee_total
    `);
  }
}
