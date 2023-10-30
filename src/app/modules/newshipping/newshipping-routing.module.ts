import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewshippingComponent } from './newshipping.component';

const routes: Routes = [
    {
        path:'',
        component:NewshippingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewshippingRoutingModule { }
