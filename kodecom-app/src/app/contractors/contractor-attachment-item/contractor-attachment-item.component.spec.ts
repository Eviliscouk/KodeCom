import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAttachmentItemComponent } from './contractor-attachment-item.component';

describe('ContractorAttachmentItemComponent', () => {
  let component: ContractorAttachmentItemComponent;
  let fixture: ComponentFixture<ContractorAttachmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAttachmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAttachmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
