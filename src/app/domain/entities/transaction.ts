import { Identifiable } from '../../common/entity-utils';
import { Franchise } from './franchise';
import { PaymentMethod } from './payment-method';
import { TransactionStatus } from './transaction-status';
import { TransactionType } from './transaction-type';

export type Transaction = Identifiable & {
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  type: TransactionType;
  createdAt: number;
  reference: number;
  amount: number;
  franchise?: Franchise;
  deduction?: number;
};
