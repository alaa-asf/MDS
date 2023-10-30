import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupDlvagentComponent } from './setup-dlvagent.component';

const routes: Routes = [
    {
        path:'',
        component:SetupDlvagentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupDlvagentRoutingModule { }
