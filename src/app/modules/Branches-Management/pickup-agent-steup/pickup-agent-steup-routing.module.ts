import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickupAgentSteupComponent } from './pickup-agent-steup.component';

const routes: Routes = [
    {
        path:'',
        component:PickupAgentSteupComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickupAgentSteupRoutingModule { }
