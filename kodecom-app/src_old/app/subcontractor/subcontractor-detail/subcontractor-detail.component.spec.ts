import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorDetailComponent } from './subcontractor-detail.component';

describe('SubcontractorDetailComponent', () => {
  let component: SubcontractorDetailComponent;
  let fixture: ComponentFixture<SubcontractorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
