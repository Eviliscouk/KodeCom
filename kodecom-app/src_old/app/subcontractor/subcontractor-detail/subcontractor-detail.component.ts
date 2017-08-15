import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';
import { Note } from '../../shared/note.model';

declare var $:any;

@Component({
  selector: 'app-subcontractor-detail',
  templateUrl: './subcontractor-detail.component.html',
  styleUrls: ['./subcontractor-detail.component.css']
})
export class SubcontractorDetailComponent implements OnInit, OnDestroy {
  private subcontractorAttachmentSub: Subscription;
  subcontractor: SubContractor;
  id: number;
  newNote: string;

  constructor(private subcontractorsService: SubContractorService,
              private route: ActivatedRoute,
              private router: Router) {
                }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.subcontractorsService.getSubContractor(this.id).subscribe(s => {
            this.subcontractor = s;
            this.newNote = "";
            this.subcontractorsService.getSubContractorNotes(this.id).subscribe(n => this.subcontractor.attachedNotes = n);
            this.subcontractorsService.getSubContractorAttachments(this.id).subscribe(a => this.subcontractor.attachedFiles = a);
            this.subcontractorAttachmentSub = this.subcontractorsService.subcontractorAttachmentsChanged.subscribe(c => this.subcontractorsService.getSubContractorAttachments(this.id).subscribe(a => this.subcontractor.attachedFiles = a));
        });
        }
      );
  }
  
  onEditSubContractor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  
  onViewPayroll(){
    //this.router.navigate(['../../payroll/', this.subcontractor.s_ID], {relativeTo: this.route});
    this.router.navigate(['../../../payroll/', this.id], {relativeTo: this.route});
  }
  
  onViewContractor(){
    this.router.navigate(['../../../contractors/', this.subcontractor.c_ID], {relativeTo: this.route});
  }

  async onAddNote()
  {
    var note = new Note(0, 0, this.id, new Date(), this.newNote);
    var result = await this.subcontractorsService.addSubContractorNote(JSON.stringify(note));
    if (result == 'ok')
    {
      this.subcontractorsService.getSubContractorNotes(this.id).subscribe(n => this.subcontractor.attachedNotes = n);
    }
    this.newNote = '';
    $("#addNote").collapse('hide');
  }

  onViewReports()
  {
    this.router.navigate(['reports'], {relativeTo: this.route});
  }
  
  async fileChange(event) {
    console.log('file change called');
    
    let fileList: FileList = event.target.files;

    if (fileList.length > 0)
    {
        var result = await this.subcontractorsService.saveAttachment(String(this.id),fileList[0]);
        if (result == 'ok')
        {
          $("#addAttachment").collapse('hide');
          this.subcontractorsService.getSubContractorAttachments(this.id).subscribe(a => this.subcontractor.attachedFiles = a);          
        }
        else{
          alert('File Upload Failed!');
        }
    }
  }

ngOnDestroy() {
        this.subcontractorAttachmentSub.unsubscribe();
    }

}
