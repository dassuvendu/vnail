import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { HttpModule } from  '@angular/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import {ToastModule} from 'ng6-toastr/ng2-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { SalonComponent } from './salon/salon.component';
import { SuccessComponent } from './success/success.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WaitingCustomerComponent } from './waiting-customer/waiting-customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AllServiceComponent } from './all-service/all-service.component';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EployeeDetailsComponent } from './eployee-details/eployee-details.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { TurmListComponent } from './turm-list/turm-list.component';
import { AppointmentBookComponent } from './appointment-book/appointment-book.component';
import { EmpTicketDetailComponent } from './emp-ticket-detail/emp-ticket-detail.component';
import { CustTicketDetailComponent } from './cust-ticket-detail/cust-ticket-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { AddGiftCardComponent } from './add-gift-card/add-gift-card.component';
import { GiftCardDetailComponent } from './gift-card-detail/gift-card-detail.component';
import { CheckOutComponent } from './check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServiceComponent,
    SalonComponent,
    SuccessComponent,
    DashboardComponent,
    WaitingCustomerComponent,
    EmployeeComponent,
    ManageCustomerComponent,
    CustomerDetailsComponent,
    AllServiceComponent,
    AllEmployeeComponent,
    EditCustomerComponent,
    AddServiceComponent,
    AddEmployeeComponent,
    EployeeDetailsComponent,
    EditEmployeeComponent,
    EditServiceComponent,
    ServiceDetailComponent,
    AddPackageComponent,
    PackageDetailComponent,
    TurmListComponent,
    AppointmentBookComponent,
    EmpTicketDetailComponent,
    CustTicketDetailComponent,
    CalendarComponent,
    HeaderComponent,
    GiftCardComponent,
    AddGiftCardComponent,
    GiftCardDetailComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    //ToastModule.forRoot()
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
