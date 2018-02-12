import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../../contractors/contractor.service';
import { SubContractorService } from '../../subcontractor/subcontractor.service';

declare var $:any;

@Component({
  selector: 'app-batch-reports-general',
  templateUrl: './batch-reports-general.component.html',
  styleUrls: ['./batch-reports-general.component.css'],
  providers:[SubContractorService, ContractorService]
})
export class BatchReportsGeneralComponent implements OnInit {

  constructor(private subcontractorsService: SubContractorService, private contractorsService: ContractorService) { }

  ngOnInit() {
  }

  onGetContractorsData()
  {
   this.contractorsService.getContractorData();
  }

  onGetSubContractorsData()
  {
   this.subcontractorsService.getSubContractorData();
  }

  showModal()
  {
    $('#myModalText').text("Processing Request");
    $("#myModal").modal('show');
  }

  updateModalText(text :string)
  {
     $('#myModalText').text(text);
  }

  closeModal()
  {
    $("#myModal").modal('hide');
  }

}
