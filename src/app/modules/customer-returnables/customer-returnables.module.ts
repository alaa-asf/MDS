import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReturnablesComponent } from './customer-returnables.component';
import { MessageModule } from 'primeng/message';
import { SharedModule } from '../../shared/shared.module';
import { CustomerReturnablesRoutes } from './customer-returnables.routing';

@NgModule({
  imports: [
    CommonModule, SharedModule, MessageModule, CustomerReturnablesRoutes
  ],
  declarations: [CustomerReturnablesComponent]
})
export class CustomerReturnablesModule { }
