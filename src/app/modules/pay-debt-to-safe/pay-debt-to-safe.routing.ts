import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayDebtToSafeComponent } from './pay-debt-to-safe.component';

const routes: Routes = [
  {
      path: '',
      component: PayDebtToSafeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PayDebtToSafeRoutes {}
