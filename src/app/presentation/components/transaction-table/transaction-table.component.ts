import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';

import moment from 'moment';
import { PaymentMethod } from '../../../domain/entities/payment-method';
import { Franchise } from '../../../domain/entities/franchise';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() filteredTransactions: Transaction[] = [];

  constructor() {}

  ngOnInit() {}

  formatDate(timestamp: number): string {
    return moment(timestamp).format('DD/MM/YYYY - HH:mm:ss');
  }

  getImageName(paymentMethod: PaymentMethod, franchise?: Franchise): string {
    console.log('paymentMethod:', paymentMethod);
    console.log('franchise:', franchise);

    switch (paymentMethod) {
      case 'CARD':
        if (franchise === 'VISA') {
          return 'visa.png';
        }
        return 'mastercard.png';
      case 'PSE':
        return 'pse.png';
      case 'DAVIPLATA':
        return 'daviplata.png';
      case 'NEQUI':
        return 'nequi.png';
      case 'BANCOLOMBIA':
        return 'bancolombia.png';
      default:
        return '';
    }
  }
}
