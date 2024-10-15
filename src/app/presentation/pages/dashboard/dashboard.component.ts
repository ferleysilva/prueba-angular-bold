import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { getTransactionsUseCase } from '../../../domain/usecases/get-transactions.usecases';
import moment from 'moment';
import { getDataFromLocalStorage } from '../../../common/services/localstorage.services';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  isLoading: boolean = false;
  transactionFilters: any = {
    date: 'today',
    paymentMethod: [],
    search: '',
  };

  constructor(private transactionRepository: BoldTransactionRepository) {}

  ngOnInit() {
    this.transactionFilters = {
      ...getDataFromLocalStorage('transationFilters')
    }
    this.getTransactionList();
  }

  getTransactionList() {
    this.isLoading = true;

    getTransactionsUseCase(this.transactionRepository).subscribe({
      next: (response: Transaction[]) => {
        this.transactions = response;
        this.filterTransactions(this.transactionFilters);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filterTransactions(filters: any) {
    console.log(filters);

    this.filteredTransactions = this.transactions;

    if (filters.date) {
      this.filterTransactionsByDate(filters.date);
    }

    if (filters.paymentMethod && filters.paymentMethod.length > 0) {
      this.filterTransactionsByPaymentMethod(filters.paymentMethod);
    }

    if (filters.search && filters.search !== '') {
      this.filterTransactionsBySearch(filters.search);
    }
  }

  filterTransactionsByDate(filter: string) {
    const now = moment();

    switch (filter) {
      case 'today':
        this.filteredTransactions = this.filteredTransactions.filter(
          (transaction) => moment(transaction.createdAt).isSame(now, 'day')
        );
        break;

      case 'week':
        this.filteredTransactions = this.filteredTransactions.filter(
          (transaction) => moment(transaction.createdAt).isSame(now, 'week')
        );
        break;

      case 'june':
        this.filteredTransactions = this.filteredTransactions.filter(
          (transaction) => moment(transaction.createdAt).month() === 5
        );
        break;
    }

    this.transactionFilters.date = filter;
  }

  filterTransactionsByPaymentMethod(transactionTypes: string[]) {
    if (transactionTypes.includes('ALL')) {
      this.filteredTransactions = this.filteredTransactions;
    } else {
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => transactionTypes.includes(transaction.type)
      );
    }
  }

  filterTransactionsBySearch(searchText: string) {
    const lowerCaseSearchTerm = searchText.toLowerCase();
    this.filteredTransactions = this.filteredTransactions.filter(
      (transaction) => {
        console.log(transaction)
        return String(transaction.reference).toLowerCase().includes(lowerCaseSearchTerm) ||
          String(transaction.type).toLowerCase().includes(lowerCaseSearchTerm) ||
          String(transaction.paymentMethod).toLowerCase().includes(lowerCaseSearchTerm) ||
          String(transaction.amount).toLowerCase().includes(lowerCaseSearchTerm) ||
          String(transaction.status).toLowerCase().includes(lowerCaseSearchTerm);
      }
    );
  }
}
