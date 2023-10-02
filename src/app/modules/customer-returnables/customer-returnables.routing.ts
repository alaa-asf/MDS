import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerReturnablesComponent } from './customer-returnables.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerReturnablesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerReturnablesRoutes { }
