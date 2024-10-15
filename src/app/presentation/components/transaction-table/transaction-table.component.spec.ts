import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableComponent } from './transaction-table.component';
import { Transaction } from '../../../domain/entities/transaction';
import { PaymentMethod } from '../../../domain/entities/payment-method';
import { Franchise } from '../../../domain/entities/franchise';
import { formatDate, getTransactionImageName, saveDataInLocalStorage } from '../../../common/services/utils';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly format the date using createdAtFormatDate', () => {
    const timestamp = 1633036800000;
    const formattedDate = component.createdAtFormatDate(timestamp);
    expect(formattedDate).toBe(formatDate(timestamp));
  });

  it('should return the correct image name for a payment method and franchise', () => {
    const paymentMethod: PaymentMethod = 'CARD';
    const franchise: Franchise = 'VISA';
    const imageName = component.getImageName(paymentMethod, franchise);
    expect(imageName).toBe(getTransactionImageName(paymentMethod, franchise));
  });

  it('should emit event when openPanelTransactionDetails is called', () => {
    spyOn(component.onShowTransactionDetails, 'emit');
    const mockTransaction: Transaction = {
      id: '123',
      amount: 1000,
      createdAt: 1633036800000,
      status: 'SUCCESSFUL',
      type: 'PAYMENT_LINK',
      reference: 1234,
      paymentMethod: 'CARD',
      franchise: 'VISA',
    };
    component.openPanelTransactionDetails(mockTransaction);
    expect(component.onShowTransactionDetails.emit).toHaveBeenCalledWith(mockTransaction);
  });

  it('should emit event when onSearchTransactions is called', () => {
    spyOn(component.filterTransactions, 'emit');
    spyOn(localStorage, 'setItem');
    const mockEvent = {
      target: { value: 'testSearch' }
    } as unknown as Event;

    component.transactionFilters = { date: '2022-10-01', paymentMethod: 'Visa' };
    component.onSearchTransactions(mockEvent);

    expect(component.filterTransactions.emit).toHaveBeenCalledWith({
      date: '2022-10-01',
      paymentMethod: 'Visa',
      search: 'testSearch'
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('transationFilters', JSON.stringify({
      date: '2022-10-01',
      paymentMethod: 'Visa',
      search: 'testSearch'
    }));
  });

  it('should have default values for transactionFilters and filteredTransactions', () => {
    expect(component.transactionFilters).toEqual({});
    expect(component.filteredTransactions).toEqual([]);
  });
});
