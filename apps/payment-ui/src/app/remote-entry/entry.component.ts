import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import PaymentService from '../../services/payment.service';
import { AppFormComponent } from '../form/form.component';
import { PaymentMethod } from './payment.entity';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent, AppFormComponent],
  selector: 'app-payment-ui-entry',
  templateUrl: "./entry.component.html"
})
export class RemoteEntryComponent implements OnInit {
  paymentService = inject(PaymentService)
  paymentMethods: (PaymentMethod & { checked: boolean })[] = []
  isAdding = false

  ngOnInit() {
    this.getPaymentMethods()
  }

  getPaymentMethods() {
    this.paymentService.getPayments().subscribe((data) => {
      this.paymentMethods = data.map(item => {
        return {
          ...item,
          checked: item.isDefault,
        }
      })
    })
  }

  selectPaymentMethod(id: string) {
    this.paymentMethods.forEach((item) => {
      item.checked = item._id === id
    })
  }

  toggleAdding() {
    this.isAdding = !this.isAdding
  }

  onSubmit(isSuccess: boolean) {
    if (isSuccess) {
      this.toggleAdding()
      this.getPaymentMethods()
    }
  }
}
