import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Transaction } from '../../../domain/entities/transaction';
import { saveDataInLocalStorage } from '../../../common/services/localstorage.services';

@Component({
  selector: 'app-dashboard-filters-component',
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
})
export class DashboardFiltersComponent implements OnInit {
  @Input() transactionFilters: any = {};
  @Input() filteredTransactions: Transaction[] = [];
  @Output() filterTransactions = new EventEmitter<{
    date: string;
    paymentMethod: string | string[];
    search: string;
  }>();
  showTooltipInfo = false;
  showCheckboxTransactionTypeFlter = false;
  filterTransactionTypeOptions = [
    { label: 'TERMINAL', checked: false },
    { label: 'PAYMENT_LINK', checked: false },
    { label: 'ALL', checked: false },
  ];

  constructor() {}

  ngOnInit(): void {
    this.filterTransactionTypeOptions = this.filterTransactionTypeOptions.map(
      (option) => {
        if (this.transactionFilters.paymentMethod.includes(option.label)) {
          return { ...option, checked: true };
        }
        return option;
      }
    );
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.right-icon') && this.showTooltipInfo) {
      this.showTooltipInfo = false;
    }
  }

  toggleTooltipInfo() {
    this.showTooltipInfo = !this.showTooltipInfo;
  }

  onDateClickAction(day: string) {
    this.filterTransactions.emit({
      ...this.transactionFilters,
      date: day,
    });

    saveDataInLocalStorage('transationFilters', {
      ...this.transactionFilters,
      date: day,
    });
  }

  getFilteredDateInString(): string {
    switch (this.transactionFilters.date) {
      case 'today':
        return moment().format('DD [de] MMMM YYYY');
      case 'week':
        const startOfWeek = moment().startOf('week').add(1, 'days');
        const endOfWeek = moment().endOf('week').add(1, 'days');

        const startDate = startOfWeek.format('DD');
        const endDate = endOfWeek.format('DD [de] MMMM YYYY');

        return `${startDate} al ${endDate}`;
      case 'october':
        const currentYearForOctober = moment().year();
        return `Octubre, ${currentYearForOctober}`;
      default:
        return '';
    }
  }

  getTotalAmount(): number {
    return this.filteredTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  }

  onShowOrHideCheckboxFiltersAction() {
    this.showCheckboxTransactionTypeFlter =
      !this.showCheckboxTransactionTypeFlter;
  }

  onChangeTransactionTypeFilterAction(option: {
    label: string;
    checked: boolean;
  }) {
    option.checked = !option.checked;

    if (!this.filterTransactionTypeOptions.some((option) => option.checked)) {
      this.applyFilters();
    }
  }

  applyFilters() {
    const selectedFilters = this.filterTransactionTypeOptions
      .filter((option) => option.checked)
      .map((option) => option.label);

    this.transactionFilters.paymentMethod = selectedFilters;

    this.filterTransactions.emit({
      ...this.transactionFilters,
      paymentMethod: selectedFilters,
    });

    saveDataInLocalStorage('transationFilters', {
      ...this.transactionFilters,
      paymentMethod: selectedFilters,
    });

    this.showCheckboxTransactionTypeFlter = false;
  }

  isApplyButtonDisabled(): boolean {
    return !this.filterTransactionTypeOptions.some((option) => option.checked);
  }
}
