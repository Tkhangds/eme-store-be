import { Column, Entity } from "typeorm";
import { Order as MedusaOrder } from "@medusajs/medusa";

@Entity()
export class Order extends MedusaOrder {
  @Column({ name: "processing_fee_total", type: "integer" })
  processing_fee_total: number;
}
