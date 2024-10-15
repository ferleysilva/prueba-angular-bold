import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { Transaction } from '../../../domain/entities/transaction';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockTransactionRepository: jasmine.SpyObj<BoldTransactionRepository>;

  beforeEach(async () => {
    mockTransactionRepository = jasmine.createSpyObj(
      'BoldTransactionRepository',
      ['getTransactions']
    );

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        {
          provide: BoldTransactionRepository,
          useValue: mockTransactionRepository,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transactions and filter them on initialization', () => {
    const mockTransactions: Transaction[] = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'PAYMENT_LINK',
        reference: 1234,
        paymentMethod: 'CARD',
        franchise: 'VISA',
      },
      {
        id: 'GBHYHJ5643',
        amount: 1000,
        createdAt: 1633036800120,
        status: 'REJECTED',
        type: 'TERMINAL',
        reference: 6456,
        paymentMethod: 'BANCOLOMBIA',
        franchise: 'MASTERCARD',
      },
    ];

    mockTransactionRepository.getTransactions.and.returnValue(
      of(mockTransactions)
    );

    spyOn(component, 'filterTransactions');

    component.getTransactionList();

    expect(mockTransactionRepository.getTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(2);
    expect(component.filterTransactions).toHaveBeenCalledWith(
      component.transactionFilters
    );
  });

  it('should handle error if fetching transactions fails', () => {
    const consoleSpy = spyOn(console, 'error');
    mockTransactionRepository.getTransactions.and.returnValue(
      throwError('Error fetching transactions')
    );

    component.getTransactionList();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching transactions:',
      'Error fetching transactions'
    );
  });

  it('should filter transactions by date', () => {
    const mockTransactions: Transaction[] = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'PAYMENT_LINK',
        reference: 1234,
        paymentMethod: 'CARD',
        franchise: 'VISA',
      },
      {
        id: 'GBHYHJ5643',
        amount: 1000,
        createdAt: 1633036800120,
        status: 'REJECTED',
        type: 'TERMINAL',
        reference: 6456,
        paymentMethod: 'BANCOLOMBIA',
        franchise: 'MASTERCARD',
      },
    ];

    component.transactions = mockTransactions;
    component.filterTransactionsByDate('today');

    expect(component.filteredTransactions.length).toBe(0);
  });

  it('should filter transactions by payment method', () => {
    component.transactions = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'TERMINAL',
        reference: 1234,
        paymentMethod: 'CARD',
        franchise: 'VISA',
      },
      {
        id: 'GBHYHJ5643',
        amount: 1000,
        createdAt: 1633036800120,
        status: 'REJECTED',
        type: 'PAYMENT_LINK',
        reference: 6456,
        paymentMethod: 'BANCOLOMBIA',
        franchise: 'MASTERCARD',
      },
    ];

    const mockFilteredTransactions: Transaction[] = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'TERMINAL',
        reference: 1234,
        paymentMethod: 'CARD',
        franchise: 'VISA',
      },
    ];

    component.filterTransactionsByPaymentMethod(['TERMINAL']);

    expect(mockFilteredTransactions.length).toBe(1);
    expect(mockFilteredTransactions[0].type).toBe('TERMINAL');
  });

  it('should show transaction details when onShowTransactionDetails is called', () => {
    const mockTransaction: Transaction = {
      id: 'SDQ32RF3',
      amount: 2000,
      createdAt: 1633036800000,
      status: 'SUCCESSFUL',
      type: 'PAYMENT_LINK',
      reference: 1234,
      paymentMethod: 'CARD',
      franchise: 'VISA',
    };

    component.onShowTransactionDetails(mockTransaction);

    expect(component.selectedTransaction).toBe(mockTransaction);
    expect(component.showTransactionDetailsPanel).toBeTrue();
  });

  it('should hide transaction details when onHideTransactionDetails is called', () => {
    component.onHideTransactionDetails();

    expect(component.selectedTransaction).toEqual({} as Transaction);
    expect(component.showTransactionDetailsPanel).toBeFalse();
  });

  it('should filter transactions by search text', () => {
    component.transactions = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'PAYMENT_LINK',
        reference: 1234,
        paymentMethod: 'DAVIPLATA',
        franchise: 'VISA',
      },
      {
        id: 'GBHYHJ5643',
        amount: 1000,
        createdAt: 1633036800120,
        status: 'REJECTED',
        type: 'TERMINAL',
        reference: 6456,
        paymentMethod: 'BANCOLOMBIA',
        franchise: 'MASTERCARD',
      },
    ];

    const mockFilteredTransactions: Transaction[] = [
      {
        id: 'SDQ32RF3',
        amount: 2000,
        createdAt: 1633036800000,
        status: 'SUCCESSFUL',
        type: 'TERMINAL',
        reference: 1234,
        paymentMethod: 'CARD',
        franchise: 'VISA',
      },
    ];

    component.filterTransactionsBySearch('SDQ32RF3');

    expect(mockFilteredTransactions.length).toBe(1);
    expect(mockFilteredTransactions[0].id).toBe('SDQ32RF3');
  });
});
