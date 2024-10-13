import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './presentation/pages/main/app.component';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { AppTopBar } from './presentation/components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppTopBar
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
