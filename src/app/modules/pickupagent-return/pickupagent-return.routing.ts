import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupagentReturnComponent } from './pickupagent-return.component';

const routes: Routes = [
  {
      path: '',
      component: PickupagentReturnComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PickupagentReturnRoutes {}
