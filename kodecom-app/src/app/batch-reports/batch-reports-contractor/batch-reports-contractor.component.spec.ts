import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchReportsContractorComponent } from './batch-reports-contractor.component';

describe('BatchReportsContractorComponent', () => {
  let component: BatchReportsContractorComponent;
  let fixture: ComponentFixture<BatchReportsContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchReportsContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchReportsContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
