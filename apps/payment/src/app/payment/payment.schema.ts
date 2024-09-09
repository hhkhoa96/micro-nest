import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Payment {
  @Prop()
  name: string;

  @Prop()
  number: string

  @Prop()
  type: "visa" | "master card"

  @Prop({ name: "is_default" })
  isDefault: boolean

  @Prop()
  cvc: number

  @Prop()
  expiredDate: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)

export type ICreatePayment = {
  name: string
  number: string
  cvc: string
  expiredDate: string
}
