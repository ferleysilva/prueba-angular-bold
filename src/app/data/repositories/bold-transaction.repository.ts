import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../common/services/api.services';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionListInputModel } from '../models/transaction.model';
import { transactionInputModelMapper } from '../../mappers/transation.mapper';

@Injectable({
  providedIn: 'root',
})
export class BoldTransactionRepository implements TransactionRepository {
  constructor(private apiService: ApiService) {}

  getTransactions(): Observable<Transaction[]> {
    try {
      const response = this.apiService.getData<TransactionListInputModel>();
      const transactions: Observable<Transaction[]> = response.pipe(map(transactionInputModelMapper));
      return transactions;
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Function not implemented.');
    }
  }
}


