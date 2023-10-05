import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewshippingComponent } from './newshipping.component';
import { NewshippingRoutingModule } from './merchants-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewshippingRoutingModule,
    SharedModule
  ],
  declarations: [NewshippingComponent]
})
export class NewshippingModule { }
