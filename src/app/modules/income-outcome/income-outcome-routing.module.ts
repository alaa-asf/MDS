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
    },
    {
        path: 'customer-account',
        loadChildren:()=>import(
            './customer-account/customer-account.module'
            ).then((m) => m.CustomerAccountModule),
        canActivate: [RoleGuard],
        data: {
            roles: ['ITBOSS'],
        }
    },
    {
        path: 'pick-up-agent',
        loadChildren:()=>import(
            './pick-up-agent/pick-up-agent.module'
            ).then((m) => m.PickUpAgentModule),
        canActivate: [RoleGuard],
        data: {
            roles: ['ITBOSS'],
        }
    },

    {
        path: 'branches',
        loadChildren:()=>import(
            './branches/branches.module'
            ).then((m) => m.BranchesModule),
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
