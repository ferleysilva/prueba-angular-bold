import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';

import moment from 'moment';
import { PaymentMethod } from '../../../domain/entities/payment-method';
import { Franchise } from '../../../domain/entities/franchise';
import { formatDate, getTransactionImageName, saveDataInLocalStorage } from '../../../common/services/utils';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css'],
})
export class TransactionTableComponent implements OnInit {
  @Input() transactionFilters: any = {};
  @Input() filteredTransactions: Transaction[] = [];
  @Output() filterTransactions = new EventEmitter<{
    date: string;
    paymentMethod: string | string[];
    search: string;
  }>();
  @Output() onShowTransactionDetails = new EventEmitter<Transaction>();

  constructor() {}

  ngOnInit() {}

  createdAtFormatDate(timestamp: number): string {
    return formatDate(timestamp);
  }

  getImageName(paymentMethod: PaymentMethod, franchise?: Franchise): string {
    return getTransactionImageName(paymentMethod, franchise);
  }

  openPanelTransactionDetails(transaction: Transaction) {
    console.log(transaction);
    this.onShowTransactionDetails.emit(transaction);
  }

  onSearchTransactions(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.filterTransactions.emit({
      ...this.transactionFilters,
      search: searchText
    });

    saveDataInLocalStorage('transationFilters', {
      ...this.transactionFilters,
      search: searchText
    });

  }
}
