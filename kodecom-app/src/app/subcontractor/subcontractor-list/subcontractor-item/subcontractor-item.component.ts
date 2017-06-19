import { Component, OnInit, Input } from '@angular/core';
import { SubContractor } from '../../subcontractor.model';
import { SubContractorService } from "../../subcontractor.service";

@Component({
  selector: 'app-subcontractor-item',
  templateUrl: './subcontractor-item.component.html',
  styleUrls: ['./subcontractor-item.component.css']
})
export class SubcontractorItemComponent implements OnInit {
  @Input() subcontractor: SubContractor;
  @Input() index: number;

  constructor(private subcontractorService: SubContractorService) { }

  ngOnInit() {
  }

}
