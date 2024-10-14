import { Observable } from 'rxjs';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export const getTransactionsUseCase = (
  transactionRepository: TransactionRepository
): Observable<Transaction[]> => {
  return transactionRepository.getTransactions();
};
