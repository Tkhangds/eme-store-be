import { TotalsService as MedusaTotalService, Order } from "@medusajs/medusa";

class TotalsService extends MedusaTotalService {
  override async getTotal(
    cartOrOrder: any,
    options: any = {}
  ): Promise<number> {
    const total = await super.getTotal(cartOrOrder, options);

    const processingFee = cartOrOrder.processing_fee_total || 0;

    return total + processingFee;
  }

  override getPaidTotal(order: Order): number {
    const paidTotal = super.getPaidTotal(order);

    const processingFee = order.processing_fee_total || 0;

    return paidTotal + processingFee;
  }
}

export default TotalsService;
