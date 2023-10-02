import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { SafeCashTransReportComponent } from './safe-cash-trans-report.component';

const routes: Routes = [
  {
      path: '',
      component: SafeCashTransReportComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafeCashTransReportRoutes {}
