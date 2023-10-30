import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupStateComponent } from './setup-state.component';


const routes: Routes = [
    {
        path:'',
        component:SetupStateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupStateRoutingModule { }
