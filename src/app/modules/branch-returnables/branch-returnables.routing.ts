import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchReturnablesComponent } from './branch-returnables.component';

const routes: Routes = [
  {
      path: '',
      component: BranchReturnablesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchReturnablesRoutes {}
