import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProcessingFeeToProductVariant1748933151382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_variant" ADD COLUMN "processing_fee" numeric DEFAULT 498`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_variant" DROP COLUMN "processing_fee"`
    );
  }
}
