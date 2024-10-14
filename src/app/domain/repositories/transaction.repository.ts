import { Observable } from 'rxjs';
import { Transaction } from '../entities/transaction';

export type TransactionRepository = {
  getTransactions(): Observable<Transaction[]>;
}
