import { TransactionListInputModel } from "../data/models/transaction.model";
import { Franchise } from "../domain/entities/franchise";
import { PaymentMethod } from "../domain/entities/payment-method";
import { Transaction } from "../domain/entities/transaction";
import { TransactionStatus } from "../domain/entities/transaction-status";
import { TransactionType } from "../domain/entities/transaction-type";

export const transactionInputModelMapper = (inputModel: TransactionListInputModel): Transaction[] => {

    const transactions: Transaction[] = inputModel.data.map((transactionModel) => ({
        id: transactionModel.id,
        status: transactionModel.status as TransactionStatus,
        paymentMethod: transactionModel.paymentMethod as PaymentMethod,
        type: transactionModel.salesType as TransactionType,
        createdAt: transactionModel.createdAt,
        reference: transactionModel.transactionReference,
        amount: transactionModel.amount,
        deduction: transactionModel.deduction,
        franchise: transactionModel.franchise as Franchise,
      }));

      
    return transactions
    

}