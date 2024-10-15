import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { formatDate, getTransactionImageName } from '../../../common/services/utils';
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
    return getTransactionImageName(paymentMethod, franchise);
  }
}
