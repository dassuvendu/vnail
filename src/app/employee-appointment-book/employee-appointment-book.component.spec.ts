import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAppointmentBookComponent } from './employee-appointment-book.component';

describe('EmployeeAppointmentBookComponent', () => {
  let component: EmployeeAppointmentBookComponent;
  let fixture: ComponentFixture<EmployeeAppointmentBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAppointmentBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAppointmentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
