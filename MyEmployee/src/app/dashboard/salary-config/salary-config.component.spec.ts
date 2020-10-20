import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryConfigComponent } from './salary-config.component';

describe('SalaryConfigComponent', () => {
  let component: SalaryConfigComponent;
  let fixture: ComponentFixture<SalaryConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
