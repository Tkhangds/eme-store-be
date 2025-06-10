import {
  FindConfig,
  CartService as MedusaCartService,
  WithRequiredProperty,
} from "@medusajs/medusa";
import { Cart, LineItem } from "@medusajs/medusa";
import { LineItemUpdate } from "@medusajs/medusa/dist/types/cart";

class CartService extends MedusaCartService {
  override async retrieveWithTotals(
    cartId: string,
    options?: FindConfig<Cart>,
    totalsConfig?: { force_taxes?: boolean }
  ): Promise<WithRequiredProperty<Cart, "total">> {
    const cart = await super.retrieveWithTotals(cartId, options, totalsConfig);

    cart.total += cart.processing_fee_total;

    return cart as WithRequiredProperty<Cart, "total">;
  }

  override async retrieve(
    cartId: string,
    options?: FindConfig<Cart>,
    totalsConfig?: { force_taxes?: boolean }
  ): Promise<Cart> {
    const cart = await super.retrieve(
      cartId,
      {
        ...options,
        relations: [...(options?.relations || []), "items", "items.variant"],
      },
      totalsConfig
    );

    cart.total += cart.processing_fee_total;

    return cart;
  }

  override async addOrUpdateLineItems(
    cartId: string,
    lineItem: LineItem,
    config?: { validateSalesChannels: boolean }
  ): Promise<void> {
    lineItem.should_merge = false;

    console.log("Adding or updating line item:", lineItem);

    const cart = await this.retrieve(cartId, {
      relations: ["items", "items.variant"],
    });

    const existingItem = cart.items.find((item) => item.id === lineItem.id);

    const feePerItem = lineItem.variant?.processing_fee || 0;

    if (existingItem) {
      const oldQuantity = existingItem.quantity;
      const newQuantity = lineItem.quantity;

      const oldFee = feePerItem * oldQuantity;
      const newFee = feePerItem * newQuantity;

      const delta = newFee - oldFee;

      cart.processing_fee_total += delta;
    } else {
      const addedFee = feePerItem * lineItem.quantity;
      cart.processing_fee_total += addedFee;
    }
    await this.cartRepository_.save(cart);

    return super.addOrUpdateLineItems(cartId, lineItem, config);
  }

  override async removeLineItem(
    cartId: string,
    lineItemIds: string[]
  ): Promise<void> {
    const cart = await this.retrieve(cartId, {
      relations: ["items", "items.variant"],
    });

    const itemsToRemove = cart.items.filter((item) =>
      lineItemIds.includes(item.id)
    );

    if (itemsToRemove.length === 0) {
      return;
    }

    const totalFeeToRemove = itemsToRemove.reduce((total, item) => {
      return total + (item.variant?.processing_fee || 0) * item.quantity;
    }, 0);

    cart.processing_fee_total -= totalFeeToRemove;

    await this.cartRepository_.save(cart);

    return super.removeLineItem(cartId, lineItemIds);
  }

  override async updateLineItem(
    cartId: string,
    lineItemId: string,
    update: LineItemUpdate
  ): Promise<Cart> {
    const cart = await this.retrieve(cartId, {
      relations: ["items", "items.variant"],
    });

    const lineItem = cart.items.find((item) => item.id === lineItemId);

    if (!lineItem) {
      throw new Error(
        `Line item with ID ${lineItemId} not found in cart ${cartId}`
      );
    }

    const oldQuantity = lineItem.quantity;
    const newQuantity = update.quantity || oldQuantity;

    const feePerItem = lineItem.variant?.processing_fee || 0;

    const oldFee = feePerItem * oldQuantity;
    const newFee = feePerItem * newQuantity;

    const delta = newFee - oldFee;

    cart.processing_fee_total += delta;

    await this.cartRepository_.save(cart);

    return super.updateLineItem(cartId, lineItemId, update);
  }
}

export default CartService;
