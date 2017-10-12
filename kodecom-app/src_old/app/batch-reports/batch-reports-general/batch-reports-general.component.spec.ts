import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchReportsGeneralComponent } from './batch-reports-general.component';

describe('BatchReportsGeneralComponent', () => {
  let component: BatchReportsGeneralComponent;
  let fixture: ComponentFixture<BatchReportsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchReportsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchReportsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
