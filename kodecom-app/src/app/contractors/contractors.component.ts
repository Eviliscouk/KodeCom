import { Component, OnInit } from '@angular/core';

import { Contractor } from './contractor.model';
import { ContractorService } from "./contractor.service";

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
  providers: [ContractorService]
})
export class ContractorsComponent implements OnInit {
  
  constructor(private contractorService: ContractorService) { }

  ngOnInit() {
    
  }

}
