import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contractor } from '../../contractor.model';
import { ContractorService } from "../../contractor.service";

@Component({
  selector: 'app-contractor-item',
  templateUrl: './contractor-item.component.html',
  styleUrls: ['./contractor-item.component.css']
})
export class ContractorItemComponent implements OnInit {
  @Input() contractor: Contractor;
  @Input() index: number;
  
  constructor(private contractorService: ContractorService) { }

  ngOnInit() {
  }

}
