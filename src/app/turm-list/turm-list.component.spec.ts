import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmListComponent } from './turm-list.component';

describe('TurmListComponent', () => {
  let component: TurmListComponent;
  let fixture: ComponentFixture<TurmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
