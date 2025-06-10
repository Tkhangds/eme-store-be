import { Column, Entity } from "typeorm";
import { ProductVariant as MedusaProductVariant } from "@medusajs/medusa";

@Entity()
export class ProductVariant extends MedusaProductVariant {
  @Column({ name: "processing_fee", type: "integer" })
  processing_fee: number;
}
