import { Column, Entity } from "typeorm";
import { Cart as MedusaCart } from "@medusajs/medusa";

@Entity()
export class Cart extends MedusaCart {
  @Column({ name: "processing_fee_total", type: "integer" })
  processing_fee_total: number;
}
