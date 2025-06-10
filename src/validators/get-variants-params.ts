import { registerOverriddenValidators } from "@medusajs/medusa";
import { StoreGetVariantsVariantParams as MedusaGetVariantsVariantParams } from "@medusajs/medusa/dist/api/routes/store/variants/get-variant";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class StoreGetVariantsVariantParams extends MedusaGetVariantsVariantParams {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: "Processing fee must be a valid number" })
  processing_fee: number;
}

registerOverriddenValidators(StoreGetVariantsVariantParams);
