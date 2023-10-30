import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleGuard} from "../../shared/guard/role.guard";

const routes: Routes = [
    {
        path: 'agent-account',
        loadChildren:()=>import(
            './agent-account/agent-account.module'
            ).then((m) => m.AgentAccountModule),
        canActivate: [RoleGuard],
        data: {
            roles: ['ITBOSS'],
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeOutcomeRoutingModule { }
