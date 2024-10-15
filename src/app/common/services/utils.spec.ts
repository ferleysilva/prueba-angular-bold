import { saveDataInLocalStorage, getDataFromLocalStorage, formatDate, getTransactionImageName } from './utils';
import { PaymentMethod } from '../../domain/entities/payment-method';
import { Franchise } from '../../domain/entities/franchise';

describe('Utils Functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save data in localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test' };
    
    saveDataInLocalStorage(key, value);
    
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it('should retrieve data from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test' };
    
    localStorage.setItem(key, JSON.stringify(value));
    
    const result = getDataFromLocalStorage(key);
    
    expect(result).toEqual(value);
  });

  it('should return the correct transaction image name for CARD and VISA', () => {
    const paymentMethod: PaymentMethod = 'CARD';
    const franchise: Franchise = 'VISA';
    
    const imageName = getTransactionImageName(paymentMethod, franchise);
    
    expect(imageName).toBe('visa.png');
  });

  it('should return the correct transaction image name for CARD and MASTERCARD', () => {
    const paymentMethod: PaymentMethod = 'CARD';
    const franchise: Franchise = 'MASTERCARD';
    
    const imageName = getTransactionImageName(paymentMethod, franchise);
    
    expect(imageName).toBe('mastercard.png');
  });

  it('should return the correct transaction image name for PSE', () => {
    const paymentMethod: PaymentMethod = 'PSE';
    
    const imageName = getTransactionImageName(paymentMethod);
    
    expect(imageName).toBe('pse.png');
  });

});
