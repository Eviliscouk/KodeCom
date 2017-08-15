import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ContractorName } from '../contractorName.model';
import { ContractorService } from "../../contractor.service";

@Component({
  selector: 'app-contractor-item',
  templateUrl: './contractor-item.component.html',
  styleUrls: ['./contractor-item.component.css']
})
export class ContractorItemComponent implements OnInit {
  @Input() contractorName: ContractorName;
  
  constructor() { }

  ngOnInit() {
  }

}
