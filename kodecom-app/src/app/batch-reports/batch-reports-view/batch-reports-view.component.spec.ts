import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchReportsViewComponent } from './batch-reports-view.component';

describe('BatchReportsViewComponent', () => {
  let component: BatchReportsViewComponent;
  let fixture: ComponentFixture<BatchReportsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchReportsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchReportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
