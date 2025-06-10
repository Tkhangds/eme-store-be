export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/orders/index"
  )) as any;
  imports.allowedStoreOrdersFields = [
    ...imports.allowedStoreOrdersFields,
    "processing_fee_total",
  ];
  imports.defaultStoreOrdersFields = [
    ...imports.defaultStoreOrdersFields,
    "processing_fee_total",
  ];
}
