import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { formatDate } from '../../../common/services/date.utils';
import { PaymentMethod } from '../../../domain/entities/payment-method';
import { Franchise } from '../../../domain/entities/franchise';

@Component({
  selector: 'app-transaction-panel-detail',
  templateUrl: './transaction-panel-detail.component.html',
  styleUrls: ['./transaction-panel-detail.component.css'],
})
export class TransactionPanelDetailComponent {
  @Input() showTransactionDetailsPanel: boolean = false;
  @Input() selectedTransaction: Transaction = {} as Transaction;
  @Output() onHideTransactionDetails: EventEmitter<void> =
    new EventEmitter();

  onHidePanelAction() {
    this.onHideTransactionDetails.emit();
  }

  createdAtFormatDate(timestamp: number): string {
    return formatDate(timestamp);
  }

  getImageName(paymentMethod: PaymentMethod, franchise?: Franchise): string {
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
