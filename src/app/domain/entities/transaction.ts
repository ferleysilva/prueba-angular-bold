import { TransactionStatus } from "./transaction-status";
import { TransactionType } from "./transaction-type";

export type Transaction = {
  id: string;
  status: TransactionStatus;
  paymentMethod: string;
  salesType: TransactionType;
  createdAt: number;
  transactionReference: number;
  amount: number;
  deduction: number;
};

export type TransactionResponseList = {
  data: Transaction[];
}