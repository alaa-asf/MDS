import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAccountRoutingModule } from './customer-account-routing.module';
import { CustomerAccountComponent } from './customer-account.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    CustomerAccountComponent
  ],
  imports: [
    CommonModule,
      SharedModule,
    CustomerAccountRoutingModule
  ]
})
export class CustomerAccountModule { }
