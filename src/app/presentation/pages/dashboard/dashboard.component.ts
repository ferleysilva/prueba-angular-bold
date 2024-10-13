import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionResponseList } from '../../../domain/entities/transaction';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { getTransactionsUsecase } from '../../../domain/usecases/get-transactions.usecases';

@Component({
  selector: 'dashboard.component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedStatus: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private transactionRepository : BoldTransactionRepository) {}

  ngOnInit() {
    this.isLoading = true;

    getTransactionsUsecase(this.transactionRepository).subscribe({

      next: (response: TransactionResponseList) => {
        this.transactions = response.data;
        console.log('Transactions:', this.transactions);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = 'Error fetching transactions';
      },
      complete: () => {
        console.log('Transaction fetching complete');
        this.isLoading = false;
      },
    });
  }

  filterTransactions() {
    console.log('Filtering transactions..');
  }
}
