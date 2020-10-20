import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollHeadComponent } from './payroll-head.component';

describe('PayrollHeadComponent', () => {
  let component: PayrollHeadComponent;
  let fixture: ComponentFixture<PayrollHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
