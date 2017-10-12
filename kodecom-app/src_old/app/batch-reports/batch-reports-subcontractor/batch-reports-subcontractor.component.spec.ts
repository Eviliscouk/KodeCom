import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchReportsSubcontractorComponent } from './batch-reports-subcontractor.component';

describe('BatchReportsSubcontractorComponent', () => {
  let component: BatchReportsSubcontractorComponent;
  let fixture: ComponentFixture<BatchReportsSubcontractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchReportsSubcontractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchReportsSubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
