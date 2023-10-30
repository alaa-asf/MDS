import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupUsersComponent } from './setup-users.component';


const routes: Routes = [
    {
        path:'',
        component:SetupUsersComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupUsersRoutingModule { }
