import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorReportsComponent } from './subcontractor-reports.component';

describe('SubcontractorReportsComponent', () => {
  let component: SubcontractorReportsComponent;
  let fixture: ComponentFixture<SubcontractorReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
