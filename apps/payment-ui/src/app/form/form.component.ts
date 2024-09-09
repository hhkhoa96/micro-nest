import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import PaymentService from "../../services/payment.service";
import { AppButtonComponent } from "../button/button.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AppButtonComponent]
})
export class AppFormComponent {
    @Output() cancelEvent = new EventEmitter()
    @Output() submitEvent = new EventEmitter<boolean>()

    paymentService = inject(PaymentService)
    formAddCard = new FormGroup({
        name: new FormControl('', [
            Validators.required,
        ]),
        number: new FormControl('', [
            Validators.required,
            Validators.minLength(19),
            Validators.maxLength(19)
        ]),
        expires: new FormControl('', [
            Validators.required,
            Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
        ]),
        cvc: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3)
        ]),
    })

    onSubmit(event: SubmitEvent) {
        event.preventDefault()
        if (this.formAddCard.valid) {
            const { name, cvc, expires, number } = this.formAddCard.value
            this.paymentService.addNewPayment({
                name: name || "",
                expiredDate: expires || "",
                number: number || "",
                cvc: cvc || ""
            }).subscribe(() => {
                this.formAddCard.reset()
                this.submitEvent.emit(true)
            })
        } else {
            console.log("Form errors:", this.formAddCard.errors)
            this.cancelEvent.emit(false)
        }
    }

    onBlurCardNumber(event: any) {
        console.log({ event: event.target.value })
    }

    onCartNumberInput() {
        if (!this.number) return
        let value = (this.number.value || "").replace(/\D/g, ''); // Remove all non-digit characters
        value = value.match(/.{1,4}/g)?.join(' ') || ''; // Group digits in sets of 4
        this.number.setValue(value, { emitEvent: false });
    }

    validateCVC(event: InputEvent) {
        const regex = /^\d*$/
        this.validateInput(event, regex)
    }

    validateInput(event: InputEvent, regex: RegExp) {
        const value = event.data || ""

        if (!regex.test(value)) {
            event.preventDefault()
        }
    }

    onCancel() {
        this.cancelEvent.emit()
    }

    get cvc() {
        return this.formAddCard.get("cvc")
    }

    get expires() {
        return this.formAddCard.get("expires")
    }

    get number() {
        return this.formAddCard.get("number")
    }
}