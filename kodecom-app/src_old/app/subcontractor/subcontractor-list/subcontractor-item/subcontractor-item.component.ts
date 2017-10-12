import { Component, OnInit, Input } from '@angular/core';
import { SubContractorName } from '../subcontractorName.model';
import { SubContractorService } from "../../subcontractor.service";

@Component({
  selector: 'app-subcontractor-item',
  templateUrl: './subcontractor-item.component.html',
  styleUrls: ['./subcontractor-item.component.css']
})
export class SubcontractorItemComponent implements OnInit {
  @Input() subcontractorName: SubContractorName;

  constructor(private subcontractorService: SubContractorService) { }

  ngOnInit() {
  }

}
