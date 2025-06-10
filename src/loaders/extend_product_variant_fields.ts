import { registerOverriddenValidators } from "@medusajs/medusa";
import { StoreGetVariantsVariantParams } from "../validators/get-variants-params";

export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any;
  imports.allowedStoreProductVariantFields = [
    ...(imports.allowedStoreProductVariantFields || []),
    "processing_fee",
  ];
  imports.defaultStoreProductVariantFields = [
    ...(imports.defaultStoreProductVariantFields || []),
    "processing_fee",
  ];

  registerOverriddenValidators(StoreGetVariantsVariantParams);
}
