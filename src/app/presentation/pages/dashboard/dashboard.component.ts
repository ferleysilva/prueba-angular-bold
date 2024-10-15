import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { getTransactionsUseCase } from '../../../domain/usecases/get-transactions.usecases';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedStatus: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  isLoading: boolean = false;
  selectedFilter: string = 'today';

  constructor(private transactionRepository: BoldTransactionRepository) {}

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.isLoading = true;

    getTransactionsUseCase(this.transactionRepository).subscribe({
      next: (response: Transaction[]) => {
        const selectedFilterDay = localStorage.getItem('selectedFilterDay');
        this.transactions = response;
        this.filterTransactions({
          type: 'date',
          value: selectedFilterDay || 'today',
        });
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filterTransactions(filter: any) {
    switch (filter.type) {
      case 'date':
        this.filterTransactionsByDate(filter.value as string);
        break;
      case 'paymentMethod':
        this.filterTransactionsByPaymentMethod(filter.value as string[]);
        break;
      case 'search':
        break;

      default:
    }
  }

  filterTransactionsByDate(filter: string) {
    const now = moment();

    switch (filter) {
      case 'today':
        this.filteredTransactions = this.transactions.filter((transaction) =>
          moment(transaction.createdAt).isSame(now, 'day')
        );
        break;

      case 'week':
        this.filteredTransactions = this.transactions.filter((transaction) =>
          moment(transaction.createdAt).isSame(now, 'week')
        );
        break;

      case 'june':
        this.filteredTransactions = this.transactions.filter(
          (transaction) => moment(transaction.createdAt).month() === 5
        );
        break;

      default:
        this.filteredTransactions = this.transactions;
    }

    this.selectedFilter = filter;
  }

  filterTransactionsByPaymentMethod(transactionTypes: string[]) {
    if (transactionTypes.includes('ALL')) {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter((transaction) =>
        transactionTypes.includes(transaction.type)
      );
    }
  }
}
