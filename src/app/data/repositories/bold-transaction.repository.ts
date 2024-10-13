import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.services';
import { TransactionResponseList } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable({
  providedIn: 'root',
})
export class BoldTransactionRepository implements TransactionRepository {
  constructor(private apiService: ApiService) {}

  getTransactions(): Observable<TransactionResponseList> {

    try {
      return this.apiService.getData();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Function not implemented.');
    }
  }
}