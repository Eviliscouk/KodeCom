import { Component, OnInit, Input } from '@angular/core';

import { Attachment } from '../../shared/attachment.model';

import { ContractorService } from '../contractor.service';

import { SubContractorService } from '../../subcontractor/subcontractor.service';

@Component({
  selector: 'app-contractor-attachment-item',
  templateUrl: './contractor-attachment-item.component.html',
  styleUrls: ['./contractor-attachment-item.component.css']
})
export class ContractorAttachmentItemComponent implements OnInit {
  @Input() contractorAttachment: Attachment;
  @Input() isContractor: boolean;
  constructor(private contractorsService: ContractorService, private subcontractorsService: SubContractorService) { }

  ngOnInit() {
  }

  public onDelete()
  {
    if (confirm("Are you sure to delete "+ this.contractorAttachment.fileName))
    {
      if (this.isContractor)
        this.contractorsService.deleteContractorAttachment(this.contractorAttachment.id);
      else
        this.subcontractorsService.deleteSubContractorAttachment(this.contractorAttachment.id);
    }
  }

  public onOpen()
  {
    if (this.isContractor)
      this.contractorsService.getContractorAttachment(this.contractorAttachment.id);//.subscribe(x => x);
    //else
      //this.subcontractorsService.deleteSubContractorAttachment(this.contractorAttachment.id);
  }

}
