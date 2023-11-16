import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PickUpAgentComponent} from "./pick-up-agent.component";

const routes: Routes = [
    {
        path:'',
        component:PickUpAgentComponent
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickUpAgentRoutingModule { }
