import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlloperationsComponent} from "./alloperations.component";
import {StagesComponent} from "./stages/stages.component";

const routes: Routes = [
    {
        path:'',
        component:AlloperationsComponent
    },
    {
        path:':stage/:step',
        component:StagesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlloperationsRoutingModule { }
