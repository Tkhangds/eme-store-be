import { MedusaRequest, MedusaResponse, PaymentStatus } from "@medusajs/medusa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  let payload: string | Buffer;

  try {
    if ((req as any).rawBody) {
      payload = (req as any).rawBody;
    } else if (req.body) {
      payload =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    } else {
      throw new Error("No body found");
    }

    event = stripe.webhooks.constructEvent(
      payload,
      sig as string,
      webhookSecret!
    );
  } catch (err) {
    console.error(
      "[Stripe webhook] Signature verification failed:",
      err.message
    );
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Rest of your webhook logic...
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const cartId = paymentIntent.metadata?.resource_id;

      if (!cartId) {
        console.warn("[Stripe webhook] Missing cart ID in metadata.");
        res.status(400).send("Missing cart ID");
        return;
      }

      try {
        const orderService = req.scope.resolve("orderService");
        const order = await orderService.retrieveByCartId(cartId);

        if (!order) {
          console.warn(`[Stripe webhook] No order found for cart ${cartId}`);
          res.status(404).send("Order not found");
          return;
        }

        await orderService.update(order.id, {
          payment_status: PaymentStatus.CAPTURED,
        });

        res.status(200).send("Payment processed");
      } catch (err) {
        console.error("[Stripe webhook] Error processing order:", err);
        res.status(500).send("Internal Server Error");
      }
      break;
    }

    default:
      console.log(`[Stripe webhook] Unhandled event type: ${event.type}`);
      res.status(200).send("Event received");
  }
}
