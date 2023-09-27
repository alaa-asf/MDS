import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DbconnectionComponent} from "./dbconnection.component";


const routes: Routes = [{
    path: '',
    component: DbconnectionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbconnectionRoutingModule { }
