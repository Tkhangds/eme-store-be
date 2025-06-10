import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyingShouldMergeDefaultValueToFalse1749012024255
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "line_item"
      ALTER COLUMN "should_merge"
      SET DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "line_item"
      ALTER COLUMN "should_merge"
      SET DEFAULT true;
    `);
  }
}
