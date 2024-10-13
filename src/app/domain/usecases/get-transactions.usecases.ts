// src/app/core/usecases/get-transactions.usecase.ts

import { Observable } from 'rxjs';
import {
  TransactionResponseList
} from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export const getTransactionsUsecase = (
  transactionRepository: TransactionRepository
): Observable<TransactionResponseList> => {
  return transactionRepository.getTransactions();
};
