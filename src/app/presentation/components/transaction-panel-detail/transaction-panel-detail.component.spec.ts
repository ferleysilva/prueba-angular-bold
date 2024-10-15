import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionPanelDetailComponent } from './transaction-panel-detail.component';
import { Transaction } from '../../../domain/entities/transaction';
import { formatDate, getTransactionImageName } from '../../../common/services/utils';
import { PaymentMethod } from '../../../domain/entities/payment-method';
import { Franchise } from '../../../domain/entities/franchise';

describe('TransactionPanelDetailComponent', () => {
  let component: TransactionPanelDetailComponent;
  let fixture: ComponentFixture<TransactionPanelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionPanelDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionPanelDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly format date using createdAtFormatDate', () => {
    const timestamp = 1633036800000;
    const formattedDate = component.createdAtFormatDate(timestamp);
    expect(formattedDate).toBe(formatDate(timestamp));
  });

  it('should return the correct image name for given payment method and franchise', () => {
    const paymentMethod: PaymentMethod = 'CARD';
    const franchise: Franchise = 'VISA';
    const imageName = component.getImageName(paymentMethod, franchise);
    expect(imageName).toBe(getTransactionImageName(paymentMethod, franchise));
  });

  it('should emit event when onHidePanelAction is called', () => {
    spyOn(component.onHideTransactionDetails, 'emit');
    component.onHidePanelAction();
    expect(component.onHideTransactionDetails.emit).toHaveBeenCalled();
  });

  it('should have showTransactionDetailsPanel set to false by default', () => {
    expect(component.showTransactionDetailsPanel).toBeFalse();
  });

  it('should accept selectedTransaction as input', () => {
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

    component.selectedTransaction = mockTransaction;
    fixture.detectChanges();
    expect(component.selectedTransaction).toEqual(mockTransaction);
  });
});
