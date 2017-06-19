import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorStartComponent } from './subcontractor-start.component';

describe('SubcontractorStartComponent', () => {
  let component: SubcontractorStartComponent;
  let fixture: ComponentFixture<SubcontractorStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
