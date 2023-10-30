import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignReceiptsToCustomersComponent } from './assign-receipts-to-customers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { assignReceiptsToCustomersRoutingModule } from './assign-receipts-to-customers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    assignReceiptsToCustomersRoutingModule
  ],
  declarations: [AssignReceiptsToCustomersComponent]
})
export class AssignReceiptsToCustomersModule { }
