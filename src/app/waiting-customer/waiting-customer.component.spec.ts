import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingCustomerComponent } from './waiting-customer.component';

describe('WaitingCustomerComponent', () => {
  let component: WaitingCustomerComponent;
  let fixture: ComponentFixture<WaitingCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
