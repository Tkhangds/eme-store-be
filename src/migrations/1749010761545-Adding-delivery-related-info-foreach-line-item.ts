import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDeliveryRelatedInfoForeachLineItem1749010761545
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           ALTER TABLE "line_item" 
           ADD COLUMN "sender_name" VARCHAR NULL,
           ADD COLUMN "sender_email" VARCHAR NULL,
           ADD COLUMN "receiver_name" VARCHAR NULL,
           ADD COLUMN "receiver_email" VARCHAR NULL,
           ADD COLUMN "delivery_method" VARCHAR NULL
       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           ALTER TABLE "line_item" 
           DROP COLUMN "sender_name",
           DROP COLUMN "sender_email",
           DROP COLUMN "receiver_name",
           DROP COLUMN "receiver_email",
           DROP COLUMN "delivery_method"
       `);
  }
}
