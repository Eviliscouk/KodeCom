import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../contractor.model';
import { Note } from '../../shared/note.model';
import { ContractorService } from '../contractor.service';

declare var $:any;

@Component({
  selector: 'app-contractor-detail',
  templateUrl: './contractor-detail.component.html',
  styleUrls: ['./contractor-detail.component.css'],
})
export class ContractorDetailComponent implements OnInit, OnDestroy {
  private contractorAttachmentSub: Subscription;
  contractor: Contractor;
  id: number;
  newNote: string;  

  constructor(private contractorsService: ContractorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contractorsService.getContractor(this.id).subscribe(c => {
            this.contractor = c;
            this.newNote = "";
            this.contractorsService.getContractorNotes(this.id).subscribe(n => this.contractor.attachedNotes = n);
            this.contractorsService.getContractorAttachments(this.id).subscribe(a => this.contractor.attachedFiles = a);
            this.contractorAttachmentSub = this.contractorsService.contractorAttachmentsChanged.subscribe(c => this.contractorsService.getContractorAttachments(this.id).subscribe(a => this.contractor.attachedFiles = a));
          });
          
        }
      );
  }

  onEditContractor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
   
  }
  
  onViewSubcontractors(){
    this.router.navigate(['../../subContractors/', this.contractor.c_ID], {relativeTo: this.route});
  }

  onViewReports()
  {
    this.router.navigate(['reports'], {relativeTo: this.route});
  }

  onBatchPayroll(){
    this.router.navigate(['../../payrollBatch/', this.contractor.c_ID], {relativeTo: this.route});
  }
  
  async onAddNote()
  {
    var note = new Note(0, this.id,0,new Date(), this.newNote);
    var result = await this.contractorsService.addContractorNote(JSON.stringify(note));
    if (result == 'ok')
    {
      this.contractorsService.getContractorNotes(this.id).subscribe(n => this.contractor.attachedNotes = n);
    }
    this.newNote = '';
    $("#addNote").collapse('hide');
  }
  
  async fileChange(event) {
    console.log('file change called');
    
    let fileList: FileList = event.target.files;

    if (fileList.length > 0)
    {
        var result = await this.contractorsService.saveAttachment(String(this.id),fileList[0]);
        if (result == 'ok')
        {
          $("#addAttachment").collapse('hide');
          this.contractorsService.getContractorAttachments(this.id).subscribe(a => this.contractor.attachedFiles = a);          
        }
        else{
          alert('File Upload Failed!');
        }
    }
  }

  ngOnDestroy() {
        this.contractorAttachmentSub.unsubscribe();
    }
}
