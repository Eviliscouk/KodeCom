import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorStartComponent } from './contractor-start.component';

describe('ContractorStartComponent', () => {
  let component: ContractorStartComponent;
  let fixture: ComponentFixture<ContractorStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
