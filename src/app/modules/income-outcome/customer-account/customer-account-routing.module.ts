import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerAccountComponent} from "./customer-account.component";

const routes: Routes = [
    {
        path:'',
        component:CustomerAccountComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAccountRoutingModule { }
