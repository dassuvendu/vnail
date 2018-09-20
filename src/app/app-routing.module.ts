import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent }      from './home/home.component';
import { ServiceComponent }      from './service/service.component';
import { SalonComponent }      from './salon/salon.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { WaitingCustomerComponent }      from './waiting-customer/waiting-customer.component';
import { EmployeeComponent }      from './employee/employee.component';
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
import { GiftCardComponent } from './gift-card/gift-card.component';
import { AddGiftCardComponent } from './add-gift-card/add-gift-card.component';
import { GiftCardDetailComponent } from './gift-card-detail/gift-card-detail.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  { path: '', component: HomeComponent, data: { title: 'Customer Login' } },
  { path: 'service', component: ServiceComponent },
  { path: 'salon', component: SalonComponent },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'waiting', component: WaitingCustomerComponent },
  { path: 'emp/:id', component: EmployeeComponent },
  { path: 'manage-customer', component: ManageCustomerComponent },
  { path: 'cust-detail/:id', component: CustomerDetailsComponent },
  { path: 'services', component: AllServiceComponent },
  { path: 'all-employee', component: AllEmployeeComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'emp-detail/:id', component: EployeeDetailsComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'edit-service/:id', component: EditServiceComponent },
  { path: 'service-detail/:id', component: ServiceDetailComponent },
  { path: 'add-package', component: AddPackageComponent },
  { path: 'package-detail/:id', component: PackageDetailComponent },
  { path: 'turn-list', component: TurmListComponent },
  { path: 'appointment-book', component: AppointmentBookComponent },
  { path: 'emp-ticket-detail/:id', component: EmpTicketDetailComponent },
  { path: 'cust-ticket-detail/:id', component: CustTicketDetailComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'gift-card', component: GiftCardComponent },
  { path: 'add-gift-card', component: AddGiftCardComponent },
  { path: 'gift-card-detail/:id', component: GiftCardDetailComponent },
  { path: 'check-out/:id', component: CheckOutComponent }
];
 
@NgModule({
  imports: [ 
  	CommonModule,
  	RouterModule.forRoot(routes, { useHash: true }) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
