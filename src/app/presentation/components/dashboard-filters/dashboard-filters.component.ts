import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../../domain/entities/transaction';
import { BoldTransactionRepository } from '../../../data/repositories/bold-transaction.repository';
import { getTransactionsUseCase } from '../../../domain/usecases/get-transactions.usecases';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-filters-component',
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
})
export class DashboardFiltersComponent implements OnInit {
  @Input() selectedFilter: string = '';
  @Input() filteredTransactions: Transaction[] = [];
  @Output() filter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onFilterClick(filter: string) {
    localStorage.setItem('selectedFilterDay', filter);
    this.filter.emit(filter);
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
}
