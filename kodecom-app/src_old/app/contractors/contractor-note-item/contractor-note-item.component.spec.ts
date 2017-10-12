import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorNoteItemComponent } from './contractor-note-item.component';

describe('ContractorNoteItemComponent', () => {
  let component: ContractorNoteItemComponent;
  let fixture: ComponentFixture<ContractorNoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorNoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
