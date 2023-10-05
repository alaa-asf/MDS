import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialFundsComponent } from './financial-funds.component';

const routes: Routes = [
  {
      path: '',
      component: FinancialFundsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FinancialFundsRoutes {}
