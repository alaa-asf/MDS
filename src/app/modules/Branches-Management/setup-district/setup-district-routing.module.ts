import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupDistrictComponent } from './setup-district.component';

const routes: Routes = [
    {
        path:'',
        component:SetupDistrictComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupDistrictRoutingModule { }
