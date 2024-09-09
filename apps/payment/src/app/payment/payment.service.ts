import { Injectable } from "@nestjs/common";
import { ICreatePayment, Payment } from "./payment.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class PaymentService {
    constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {
    }

    findAll() {
        return this.paymentModel.find().exec()
    }

    findOne(id: number) {
        return this.paymentModel.findById(id)
    }

    create(payload: ICreatePayment) {
        const created = new this.paymentModel({
            name: payload.name,
            number: payload.number,
            cvc: payload.cvc,
            type: payload.number[0] === "4" ? "visa" : "master card",
            isDefault: false,
            expiredDate: payload.expiredDate
        })
        return created.save()
    }
}