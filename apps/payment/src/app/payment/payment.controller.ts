import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { ICreatePayment, Payment } from "./payment.schema";


@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get()
    findAll() {
        return this.paymentService.findAll()
    }

    @Get(":id")
    findOne(@Param() params: { id: number }) {
        return this.paymentService.findOne(params.id)
    }

    @Post()
    create(@Body() payload: ICreatePayment) {
        console.log(payload)
        return this.paymentService.create(payload)
    }
}