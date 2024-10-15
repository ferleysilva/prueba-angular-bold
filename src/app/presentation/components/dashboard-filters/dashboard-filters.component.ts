import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Transaction } from '../../../domain/entities/transaction';

@Component({
  selector: 'app-dashboard-filters-component',
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
})
export class DashboardFiltersComponent implements OnInit {
  @Input() selectedFilter: string = '';
  @Input() filteredTransactions: Transaction[] = [];
  @Output() filterTransactions = new EventEmitter<{
    type: string;
    value: string | string[];
  }>();

  showCheckboxFilters = false;
  filterTransactionTypeOptions = [
    { label: 'TERMINAL', checked: false },
    { label: 'PAYMENT_LINK', checked: false },
    { label: 'ALL', checked: false },
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadFiltersFromLocalStorage();
  }

  onFilterClick(day: string) {
    localStorage.setItem('selectedFilterDay', day);
    this.filterTransactions.emit({ type: 'date', value: day });
  }

  getFilteredDateInString(): string {
    switch (this.selectedFilter) {
      case 'today':
        return moment().format('DD [de] MMMM YYYY');
      case 'week':
        const startOfWeek = moment().startOf('week').add(1, 'days');
        const endOfWeek = moment().endOf('week').add(1, 'days');

        const startDate = startOfWeek.format('DD');
        const endDate = endOfWeek.format('DD [de] MMMM YYYY');

        return `${startDate} al ${endDate}`;
      case 'june':
        const currentYearForJune = moment().year();
        return `Junio, ${currentYearForJune}`;
      default:
        return '';
    }
  }

  getTotalAmount(): number {
    return this.filteredTransactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  }

  showOrHideCheckboxFilters() {
    this.showCheckboxFilters = !this.showCheckboxFilters;
  }

  onFilterChange(option: { label: string; checked: boolean }) {
    console.log(option);
    option.checked = !option.checked;
  }

  applyFilters() {
    const selectedFilters = this.filterTransactionTypeOptions
      .filter((option) => option.checked)
      .map((option) => option.label);

    this.saveFiltersToLocalStorage();

    this.filterTransactions.emit({
      type: 'paymentMethod',
      value: selectedFilters,
    });
  }

  isApplyButtonDisabled(): boolean {
    return !this.filterTransactionTypeOptions.some((option) => option.checked);
  }

  saveFiltersToLocalStorage() {
    const filtersToSave = this.filterTransactionTypeOptions.map((option) => ({
      label: option.label,
      checked: option.checked,
    }));
    localStorage.setItem('selectedFilters', JSON.stringify(filtersToSave));
  }

  loadFiltersFromLocalStorage() {
    const savedFilters = localStorage.getItem('selectedFilters');
    if (savedFilters) {
      this.filterTransactionTypeOptions = JSON.parse(savedFilters);
    }
  }
}
