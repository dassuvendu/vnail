import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EployeeDetailsComponent } from './eployee-details.component';

describe('EployeeDetailsComponent', () => {
  let component: EployeeDetailsComponent;
  let fixture: ComponentFixture<EployeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EployeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
