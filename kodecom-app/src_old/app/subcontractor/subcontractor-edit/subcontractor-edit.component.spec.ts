import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorEditComponent } from './subcontractor-edit.component';

describe('SubcontractorEditComponent', () => {
  let component: SubcontractorEditComponent;
  let fixture: ComponentFixture<SubcontractorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
