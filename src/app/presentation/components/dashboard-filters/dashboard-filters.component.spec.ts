import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardFiltersComponent } from './dashboard-filters.component';
import moment from 'moment';

describe('DashboardFiltersComponent', () => {
  let component: DashboardFiltersComponent;
  let fixture: ComponentFixture<DashboardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFiltersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
});

describe('getFilteredDateInString', () => {
  it('should return today\'s date in the correct format', () => {
    const component = new DashboardFiltersComponent();
    component.transactionFilters = { date: 'today' };
    const expectedDate = moment().format('DD [de] MMMM YYYY');
    expect(component.getFilteredDateInString()).toBe(expectedDate);
  });

  it('should return the correct week date range', () => {
    const component = new DashboardFiltersComponent();
    component.transactionFilters = { date: 'week' };
    const startOfWeek = moment().startOf('week').add(1, 'days').format('DD');
    const endOfWeek = moment().endOf('week').add(1, 'days').format('DD [de] MMMM YYYY');
    const expectedRange = `${startOfWeek} al ${endOfWeek}`;
    expect(component.getFilteredDateInString()).toBe(expectedRange);
  });

  it('should return October date in the correct format', () => {
    const component = new DashboardFiltersComponent();
    component.transactionFilters = { date: 'october' };
    const currentYear = moment().year();
    expect(component.getFilteredDateInString()).toBe(`Octubre, ${currentYear}`);
  });

  it('should return empty string for invalid date filter', () => {
    const component = new DashboardFiltersComponent();
    component.transactionFilters = { date: 'invalid' };
    expect(component.getFilteredDateInString()).toBe('');
  });
});

