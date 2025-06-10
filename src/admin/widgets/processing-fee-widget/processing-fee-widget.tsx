import type { WidgetConfig } from "@medusajs/admin";

const ProcessingFeeWidget = () => {
  return (
    <div>
      <h1>Product Widget</h1>
    </div>
  );
};

export const config: WidgetConfig = {
  zone: "product.details.after",
};

export default ProcessingFeeWidget;
