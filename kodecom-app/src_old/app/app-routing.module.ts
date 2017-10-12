import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorsComponent } from './contractors/contractors.component';
import { ContractorStartComponent } from './contractors/contractor-start/contractor-start.component';
import { ContractorDetailComponent } from './contractors/contractor-detail/contractor-detail.component';
import { ContractorReportsComponent } from './contractors/contractor-reports/contractor-reports.component';
import { ContractorEditComponent } from './contractors/contractor-edit/contractor-edit.component';
import { SubcontractorComponent } from './subcontractor/subcontractor.component';
import { SubcontractorStartComponent } from './subcontractor/subcontractor-start/subcontractor-start.component';
import { SubcontractorDetailComponent } from './subcontractor/subcontractor-detail/subcontractor-detail.component';
import { SubcontractorEditComponent } from './subcontractor/subcontractor-edit/subcontractor-edit.component';
import { SubcontractorReportsComponent } from './subcontractor/subcontractor-reports/subcontractor-reports.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollDetailComponent } from './payroll/payroll-detail/payroll-detail.component';
import { PayrollEditComponent } from './payroll/payroll-edit/payroll-edit.component';
import { PayrollBatchComponent } from './payroll/payroll-batch/payroll-batch.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerEditComponent } from './owner/owner-edit/owner-edit.component';
import { BatchReportsComponent } from './batch-reports/batch-reports.component';
import { BatchReportsContractorComponent } from './batch-reports/batch-reports-contractor/batch-reports-contractor.component';
import { BatchReportsSubcontractorComponent } from './batch-reports/batch-reports-subcontractor/batch-reports-subcontractor.component';
import { BatchReportsGeneralComponent } from './batch-reports/batch-reports-general/batch-reports-general.component';
import { BatchReportsViewComponent } from './batch-reports/batch-reports-view/batch-reports-view.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contractors', pathMatch: 'full' },
  { path: 'owner', component: OwnerComponent, pathMatch: 'full' },
  { path: 'owner/edit', component: OwnerEditComponent, pathMatch: 'full' },
  { path: 'reports', component: BatchReportsComponent, children: [
    { path: '', redirectTo: 'contractors', pathMatch: 'full' },
    { path: 'contractors', component: BatchReportsContractorComponent },
    { path: 'subcontractors', component: BatchReportsSubcontractorComponent },
    { path: 'general', component: BatchReportsGeneralComponent },
    { path: 'view', component: BatchReportsViewComponent },
  ]},
  { path: 'contractors', component: ContractorsComponent, children: [
    { path: '', component: ContractorStartComponent, pathMatch: 'full' },
    { path: 'new', component: ContractorEditComponent },
    { path: ':id', component: ContractorDetailComponent },
    { path: ':id/edit', component: ContractorEditComponent },
    { path: ':id/reports', component: ContractorReportsComponent },
  ]},
  { path: 'subContractors/:id', component: SubcontractorComponent, children: [
    { path: '', component: SubcontractorStartComponent, pathMatch: 'full' },
    { path: 'new', component: SubcontractorEditComponent },
    { path: ':id', component: SubcontractorDetailComponent },
    { path: ':id/edit', component: SubcontractorEditComponent },
    { path: ':id/reports', component: SubcontractorReportsComponent },
  ]},
  { path: 'payroll/:id', component: PayrollComponent, children: [
    { path: 'new', component: PayrollEditComponent },
    { path: ':pid', component: PayrollDetailComponent },
    { path: ':pid/edit', component: PayrollEditComponent },
  ] },
  { path: 'payrollBatch/:id', component: PayrollBatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }