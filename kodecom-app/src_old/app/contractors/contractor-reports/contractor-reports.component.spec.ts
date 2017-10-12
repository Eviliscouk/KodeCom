import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorReportsComponent } from './contractor-reports.component';

describe('ContractorReportsComponent', () => {
  let component: ContractorReportsComponent;
  let fixture: ComponentFixture<ContractorReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
