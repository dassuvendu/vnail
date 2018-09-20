import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTicketDetailComponent } from './emp-ticket-detail.component';

describe('EmpTicketDetailComponent', () => {
  let component: EmpTicketDetailComponent;
  let fixture: ComponentFixture<EmpTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
