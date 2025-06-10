export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/carts/index"
  )) as any;
  imports.allowedStoreCartFields = [
    ...imports.allowedStoreCartFields,
    "processing_fee_total",
  ];
  imports.defaultStoreCartFields = [
    ...imports.defaultStoreCartFields,
    "processing_fee_total",
  ];
}
