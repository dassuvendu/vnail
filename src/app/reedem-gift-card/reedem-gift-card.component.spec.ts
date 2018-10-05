import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReedemGiftCardComponent } from './reedem-gift-card.component';

describe('ReedemGiftCardComponent', () => {
  let component: ReedemGiftCardComponent;
  let fixture: ComponentFixture<ReedemGiftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReedemGiftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReedemGiftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
