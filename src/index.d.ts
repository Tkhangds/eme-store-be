export declare module "@medusajs/medusa/dist/models/product-variant" {
  declare interface ProductVariant {
    processing_fee: number;
  }
}

export declare module "@medusajs/medusa/dist/models/gift-card" {
  declare interface GiftCard {
    sender_name?: string | null;
    sender_email?: string | null;
    receiver_name?: string | null;
    receiver_email?: string | null;
    delivery_method?: string | null;
  }
}

export declare module "@medusajs/medusa/dist/types/gift-card" {
  declare interface UpdateGiftCardInput {
    sender_name?: string | null;
    sender_email?: string | null;
    receiver_name?: string | null;
    receiver_email?: string | null;
    delivery_method?: string | null;
  }
}

export declare module "@medusajs/medusa/dist/models/cart" {
  declare interface Cart {
    processing_fee_total: number;
  }
}

export declare module "@medusajs/medusa/dist/models/order" {
  declare interface Order {
    processing_fee_total: number;
  }
}
