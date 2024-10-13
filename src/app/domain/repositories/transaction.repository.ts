import { Observable } from 'rxjs';
import { TransactionResponseList } from '../entities/transaction';

export interface TransactionRepository {
  getTransactions(): Observable<TransactionResponseList>;
}
