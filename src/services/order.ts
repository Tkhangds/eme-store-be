import {
  Cart,
  FindConfig,
  OrderService as MedusaOrderService,
  Order,
} from "@medusajs/medusa";
import { TotalsContext } from "@medusajs/medusa/dist/types/orders";

class OrderService extends MedusaOrderService {
  override async decorateTotals(
    order: Order,
    context?: unknown
  ): Promise<Order> {
    const decoratedOrder = await super.decorateTotals(order, context);
    const processingFeeTotal = order.items.reduce((sum, item) => {
      const fee = item.variant?.processing_fee || 0;
      return sum + fee * item.quantity;
    }, 0);
    decoratedOrder.total += processingFeeTotal;
    return decoratedOrder;
  }

  override async retrieveWithTotals(
    orderId: string,
    options?: FindConfig<Order>,
    context?: TotalsContext
  ): Promise<Order> {
    const order = await super.retrieveWithTotals(orderId, options, context);
    const processingFeeTotal = order.items.reduce((sum, item) => {
      const fee = item.variant?.processing_fee || 0;
      return sum + fee * item.quantity;
    }, 0);

    order.processing_fee_total = processingFeeTotal;

    return order;
  }

  override async retrieve(
    orderId: string,
    options?: FindConfig<Order>
  ): Promise<Order> {
    const order = await super.retrieve(orderId, {
      ...options,
      relations: [...(options?.relations || []), "items", "items.variant"],
    });

    order.total += order.processing_fee_total;

    return order;
  }

  // override async createFromCart(
  //   cartOrId: string | Cart
  // ): Promise<Order | never> {
  //   const cartId = typeof cartOrId === "string" ? cartOrId : cartOrId.id;

  //   const cart = await this.cartService_.retrieve(cartId, {
  //     relations: ["items", "items.variant"],
  //   });

  //   console.log("Cart items:", cart.processing_fee_total);

  //   const result = await super.createFromCart(cartId);

  //   result.processing_fee_total = cart.processing_fee_total;

  //   await this.atomicPhase_(async (manager) => {
  //     const orderRepo = manager.withRepository(this.orderRepository_);
  //     await orderRepo.update(result.id, {
  //       processing_fee_total: cart.processing_fee_total,
  //     });
  //   });

  //   return result;
  // }
}

export default OrderService;
