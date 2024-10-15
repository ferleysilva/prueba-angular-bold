import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './presentation/pages/main/app.component';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { AppTopBar } from './presentation/components/top-bar/top-bar.component';
import { DashboardFiltersComponent } from './presentation/components/dashboard-filters/dashboard-filters.component';
import { TransactionTableComponent } from './presentation/components/transaction-table/transaction-table.component';
import { LoadingComponent } from './presentation/components/loading/loading.component';
import { TransactionPanelDetailComponent } from './presentation/components/transaction-panel-detail/transaction-panel-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    DashboardComponent,
    AppTopBar,
    DashboardFiltersComponent,
    TransactionTableComponent,
    TransactionPanelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
