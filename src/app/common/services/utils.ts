import moment from "moment";
import { PaymentMethod } from "../../domain/entities/payment-method";
import { Franchise } from "../../domain/entities/franchise";


export const saveDataInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export const formatDate = (timestamp: number): string => {
    return moment(timestamp).format('DD/MM/YYYY - HH:mm:ss');
  }

  export const getTransactionImageName = (paymentMethod: PaymentMethod, franchise?: Franchise): string  =>{
    switch (paymentMethod) {
      case 'CARD':
        if (franchise === 'VISA') {
          return 'visa.png';
        }
        return 'mastercard.png';
      case 'PSE':
        return 'pse.png';
      case 'DAVIPLATA':
        return 'daviplata.png';
      case 'NEQUI':
        return 'nequi.png';
      case 'BANCOLOMBIA':
        return 'bancolombia.png';
      default:
        return '';
    }
  }