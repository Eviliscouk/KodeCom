import { Component, OnInit, Input } from '@angular/core';

import { Note } from '../../shared/note.model';

@Component({
  selector: 'app-contractor-note-item',
  templateUrl: './contractor-note-item.component.html',
  styleUrls: ['./contractor-note-item.component.css']
})
export class ContractorNoteItemComponent implements OnInit {
  @Input() contractorNote: Note;
  
  constructor() { }

  ngOnInit() {
  }

}
