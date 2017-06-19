import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorItemComponent } from './subcontractor-item.component';

describe('SubcontractorItemComponent', () => {
  let component: SubcontractorItemComponent;
  let fixture: ComponentFixture<SubcontractorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
