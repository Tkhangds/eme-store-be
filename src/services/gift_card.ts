import {
  GiftCard,
  GiftCardService as MedusaGiftCardService,
} from "@medusajs/medusa";
import { CreateGiftCardInput } from "@medusajs/medusa/dist/types/gift-card";

class GiftCarService extends MedusaGiftCardService {
  override async create(giftCard: CreateGiftCardInput): Promise<GiftCard> {
    const result = await super.create(giftCard);

    console.log("GiftCardService create", giftCard.metadata);

    await this.atomicPhase_(async (manager) => {
      const giftCardRepo = manager.withRepository(this.giftCardRepository_);
      await giftCardRepo.update(result.id, {
        sender_name:
          (result.metadata &&
            ((result.metadata as any).sender_name as string)) ||
          "",
        sender_email:
          (result.metadata &&
            ((result.metadata as any).sender_email as string)) ||
          "",
        receiver_name:
          (result.metadata &&
            ((result.metadata as any).receiver_name as string)) ||
          "",
        receiver_email:
          (result.metadata &&
            ((result.metadata as any).receiver_email as string)) ||
          "",
        delivery_method:
          (result.metadata &&
            ((result.metadata as any).delivery_method as string)) ||
          "",
      });
    });

    console.log("GiftCardService create result", result);

    return result;
  }
}

export default GiftCarService;
