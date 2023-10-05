import { Routes, RouterModule } from '@angular/router';
import { OutBoxTransactionsComponent } from './out-box-transactions.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
      path: '',
      component: OutBoxTransactionsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutBoxTransactionsRoutes {}
