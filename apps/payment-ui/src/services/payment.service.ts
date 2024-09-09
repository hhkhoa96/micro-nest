import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentMethod, PaymentMethodCreate } from "../app/remote-entry/payment.entity";

const PAYMENT_API_URL = "http://localhost:3000/api"

@Injectable({
    providedIn: 'root'
})
class PaymentService {
    constructor(private http: HttpClient) {}

    getPayments() {
        return this.http.get<PaymentMethod[]>(PAYMENT_API_URL + "/payment")
    }

    addNewPayment(payload: PaymentMethodCreate) {
        return this.http.post<PaymentMethod>(PAYMENT_API_URL + "/payment", payload)
    }
}

export default PaymentService