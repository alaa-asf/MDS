import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignReceiptsToCustomersComponent } from './assign-receipts-to-customers.component';


const routes: Routes = [
    {
        path:'',
        component:AssignReceiptsToCustomersComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class assignReceiptsToCustomersRoutingModule { }
