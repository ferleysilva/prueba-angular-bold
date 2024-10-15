import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { getTransactionsUseCase } from '../../../domain/usecases/get-transactions.usecases';
import moment from 'moment';
import { transactionViewModelMapper } from '../../../mappers/transation.mapper';
import { getDataFromLocalStorage } from '../../../common/services/utils';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedTransaction: Transaction =  {} as Transaction;
  isLoading: boolean = false;
  showTransactionDetailsPanel: boolean = false;
  transactionFilters: any = {
    date: 'today',
    paymentMethod: [],
    search: '',
  };

  constructor(private transactionRepository: BoldTransactionRepository) {}

  ngOnInit() {

    const transationFiltersStored = getDataFromLocalStorage('transationFilters')

    if (transationFiltersStored.date) {
      this.transactionFilters = {
        ...transationFiltersStored,
      };
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

  onShowTransactionDetails(transaction: Transaction) {
      this.selectedTransaction = transaction;
      this.showTransactionDetailsPanel = true;
  }

  onHideTransactionDetails() {
    this.selectedTransaction = {} as Transaction;
    this.showTransactionDetailsPanel = false;
  }

  filterTransactions(filters: any) {
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

      case 'october':
        this.filteredTransactions = this.filteredTransactions.filter(
          (transaction) => moment(transaction.createdAt).month() === 9
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
    const searchTextInArray = this.normalizeSearchText(searchText);

    const filteredTransactionsIds = this.getFilteredTransactionIds(
      this.filteredTransactions,
      searchTextInArray
    );

    this.filteredTransactions = this.filterTransactionsByIds(
      this.filteredTransactions,
      filteredTransactionsIds
    );
  }

  private normalizeSearchText(searchText: string): string[] {
    return searchText
      .toLowerCase()
      .split(' ')
      .filter((text) => text);
  }

  private getFilteredTransactionIds(
    transactions: Transaction[],
    searchTextInArray: string[]
  ): string[] {
    const transactionsMappers = transactionViewModelMapper(transactions);

    return transactionsMappers
      .filter((transaction) =>
        this.isTransactionMatching(transaction, searchTextInArray)
      )
      .map((transaction) => transaction.id);
  }

  private isTransactionMatching(
    transaction: Transaction,
    searchTextInArray: string[]
  ): boolean {
    const fieldsToSearch = [
      String(transaction.reference).toLowerCase(),
      String(transaction.paymentMethod).toLowerCase(),
      String(transaction.amount).toLowerCase(),
      String(transaction.status).toLowerCase(),
      String(transaction.createdAt).toLowerCase(),
    ];

    return searchTextInArray.every((text) =>
      fieldsToSearch.some((field) => field.includes(text))
    );
  }

  private filterTransactionsByIds(
    transactions: Transaction[],
    filteredIds: string[]
  ): any[] {
    return transactions.filter((transaction) =>
      filteredIds.includes(transaction.id)
    );
  }
}
