import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../contractor.model';
import { ContractorService } from '../contractor.service';

@Component({
  selector: 'app-contractor-edit',
  templateUrl: './contractor-edit.component.html',
  styleUrls: ['./contractor-edit.component.css']
})
export class ContractorEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Contractor;

  constructor(private route: ActivatedRoute, private contractorsService: ContractorService) { }

  ngOnInit() {
     this.subscription = this.contractorsService.startedEditing
       .subscribe(
         (id: number) => {
          
          this.editForm.setValue({
             companyName: this.editedItem.companyName,
             firstName: this.editedItem.firstName,
             surname: this.editedItem.surname,
             address: this.editedItem.address,
             town: this.editedItem.town,
             county: this.editedItem.county,
             postcode: this.editedItem.postcode,
             phone: this.editedItem.phone,
             mobPhone: this.editedItem.mobPhone,
             fax: this.editedItem.mobPhone,
             email: this.editedItem.email
           });
          
         }
       );
      
      this.route.params
      .subscribe(
        (params: Params) => {
          this.editedItemIndex = +params['id'];
          
          
          if (this.editedItemIndex)
          {
            this.editMode = true;
            this.editedItem = this.contractorsService.getContractor(this.editedItemIndex);   
          }
          else
          {
            this.editMode = false;
          }
            
          setTimeout(() => {this.contractorsService.startedEditing.next(this.editedItemIndex);}, 100);
           
        }
      );
  }
  
  onSubmit(form: NgForm) {
    const value = form.value;
    const newContractor = new Contractor(4, 'Bob', 'Hope4', 'Hope Ltd', '1 London Rd', 'Ongar', 'Essex', 'CM5 9PH',  '0208567435', '0796537645',
  '', 'bob@hopeltd.co.uk',  'UTR',  '200',  'Yes',  'Payer Type');
  
    if (this.editMode) {
      this.contractorsService.updateContractor(this.editedItem.c_ID, newContractor);
    } else {
      this.contractorsService.addContractor(newContractor);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.contractorsService.deleteContractor(this.editedItem.c_ID);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
