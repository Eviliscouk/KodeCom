import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContractorListComponent } from './contractors/contractor-list/contractor-list.component';
import { ContractorItemComponent } from './contractors/contractor-list/contractor-item/contractor-item.component';
import { ContractorStartComponent } from './contractors/contractor-start/contractor-start.component';
import { HeaderComponent } from './header/header.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { ContractorDetailComponent } from './contractors/contractor-detail/contractor-detail.component';
import { ContractorEditComponent } from './contractors/contractor-edit/contractor-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SubcontractorComponent } from './subcontractor/subcontractor.component';
import { FilterDisplayNamePipe } from './shared/filter-displayName.pipe';
import { DataFilterPipe } from './shared/data-filter.pipe';
import { SubcontractorListComponent } from './subcontractor/subcontractor-list/subcontractor-list.component';
import { SubcontractorItemComponent } from './subcontractor/subcontractor-list/subcontractor-item/subcontractor-item.component';
import { SubcontractorDetailComponent } from './subcontractor/subcontractor-detail/subcontractor-detail.component';
import { SubcontractorEditComponent } from './subcontractor/subcontractor-edit/subcontractor-edit.component';
import { SubcontractorStartComponent } from './subcontractor/subcontractor-start/subcontractor-start.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollEditComponent } from './payroll/payroll-edit/payroll-edit.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { ContractorNoteItemComponent } from './contractors/contractor-note-item/contractor-note-item.component';
import { ContractorAttachmentItemComponent } from './contractors/contractor-attachment-item/contractor-attachment-item.component';
import { PayrollBatchComponent } from './payroll/payroll-batch/payroll-batch.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerEditComponent } from './owner/owner-edit/owner-edit.component';
import { PayrollDeductionItemComponent } from './payroll/payroll-deduction-item/payroll-deduction-item.component';
import { SubcontractorReportsComponent } from './subcontractor/subcontractor-reports/subcontractor-reports.component';
import { ContractorReportsComponent } from './contractors/contractor-reports/contractor-reports.component';
import { BatchReportsComponent } from './batch-reports/batch-reports.component';
import { BatchReportsContractorComponent } from './batch-reports/batch-reports-contractor/batch-reports-contractor.component';
import { BatchReportsSubcontractorComponent } from './batch-reports/batch-reports-subcontractor/batch-reports-subcontractor.component';
import { BatchReportsGeneralComponent } from './batch-reports/batch-reports-general/batch-reports-general.component';
import { BatchReportsViewComponent } from './batch-reports/batch-reports-view/batch-reports-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ContractorListComponent,
    ContractorItemComponent,
    ContractorStartComponent,
    HeaderComponent,
    ContractorsComponent,
    ContractorDetailComponent,
    ContractorEditComponent,
    DropdownDirective,
    SubcontractorComponent,
    FilterDisplayNamePipe,
    SubcontractorListComponent,
    SubcontractorItemComponent,
    SubcontractorDetailComponent,
    SubcontractorEditComponent,
    SubcontractorStartComponent,
    PayrollComponent,
    DataFilterPipe,
    PayrollEditComponent,
    PayrollDetailComponent,
    ContractorNoteItemComponent,
    ContractorAttachmentItemComponent,
    PayrollBatchComponent,
    OwnerComponent,
    OwnerEditComponent,
    PayrollDeductionItemComponent,
    SubcontractorReportsComponent,
    ContractorReportsComponent,
    BatchReportsComponent,
    BatchReportsContractorComponent,
    BatchReportsSubcontractorComponent,
    BatchReportsGeneralComponent,
    BatchReportsViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
