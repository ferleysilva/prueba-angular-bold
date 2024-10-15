import moment from 'moment';
import { TransactionListInputModel } from '../data/models/transaction.model';
import { Franchise } from '../domain/entities/franchise';
import { PaymentMethod } from '../domain/entities/payment-method';
import { Transaction } from '../domain/entities/transaction';
import { TransactionStatus } from '../domain/entities/transaction-status';
import { TransactionType } from '../domain/entities/transaction-type';

export const transactionInputModelMapper = (
  inputModel: TransactionListInputModel
): Transaction[] => {
  const transactions: Transaction[] = inputModel.data.map(
    (transactionModel) => ({
      id: transactionModel.id,
      status: transactionModel.status as TransactionStatus,
      paymentMethod: transactionModel.paymentMethod as PaymentMethod,
      type: transactionModel.salesType as TransactionType,
      createdAt: transactionModel.createdAt,
      reference: transactionModel.transactionReference,
      amount: transactionModel.amount,
      deduction: transactionModel.deduction,
      franchise: transactionModel.franchise as Franchise,
    })
  );

  return transactions;
};

export const transactionViewModelMapper = (
  transaction: Transaction[]
): Transaction[] => {
  const transactions: Transaction[] = transaction.map((transactionModel) => ({
    id: transactionModel.id,
    status: getStatusText(transactionModel.status) as TransactionStatus,
    paymentMethod: transactionModel.paymentMethod,
    type: getTypeText(transactionModel.type) as TransactionType,
    createdAt: getFormatDate(transactionModel.createdAt) as any,
    reference: transactionModel.reference,
    amount: transactionModel.amount,
    deduction: transactionModel.deduction,
    franchise: transactionModel.franchise,
  }));

  return transactions;
};

const getStatusText = (status: TransactionStatus) => {
  switch (status) {
    case 'SUCCESSFUL':
      return 'Cobro exitoso';
    case 'REJECTED':
      return 'Cobro no realizado';
    default:
      return '';
  }
};

const getFormatDate = (date: number): string => {
  return moment(date).format('DD/MM/YYYY - HH:mm:ss');
};

const getTypeText = (type: TransactionType) => {
  switch (type) {
    case 'PAYMENT_LINK':
      return 'Link de pago';
    case 'TERMINAL':
      return 'Datafono';
    default:
      return '';
  }
};
