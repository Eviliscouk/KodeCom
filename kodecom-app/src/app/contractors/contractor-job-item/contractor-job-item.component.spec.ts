import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorJobItemComponent } from './contractor-job-item.component';

describe('ContractorJobItemComponent', () => {
  let component: ContractorJobItemComponent;
  let fixture: ComponentFixture<ContractorJobItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorJobItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorJobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
