import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentReturnablesComponent } from './agent-returnables.component';

const routes: Routes = [
  {
      path: '',
      component: AgentReturnablesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentReturnablesRoutes {}
