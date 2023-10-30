import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupCustomersComponent } from './setup-customers.component';

const routes: Routes = [
    {
        path:'',
        component:SetupCustomersComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupCustomersRoutingModule { }
