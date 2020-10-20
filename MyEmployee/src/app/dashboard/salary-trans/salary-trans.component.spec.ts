import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryTransComponent } from './salary-trans.component';

describe('SalaryTransComponent', () => {
  let component: SalaryTransComponent;
  let fixture: ComponentFixture<SalaryTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
