import { Column, Entity } from "typeorm";
import { GiftCard as MedusaGiftCard } from "@medusajs/medusa";

@Entity()
export class GiftCard extends MedusaGiftCard {
  @Column({ type: "varchar", nullable: true })
  sender_name: string;

  @Column({ type: "varchar", nullable: true })
  sender_email: string;

  @Column({ type: "varchar", nullable: true })
  receiver_name: string;

  @Column({ type: "varchar", nullable: true })
  receiver_email: string;

  @Column({ type: "varchar", nullable: true })
  delivery_method: string;
}
