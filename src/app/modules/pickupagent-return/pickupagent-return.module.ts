import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupagentReturnComponent } from './pickupagent-return.component';
import { MessageModule } from 'primeng/message';
import { SharedModule } from '../../shared/shared.module';
import { PickupagentReturnRoutes } from './pickupagent-return.routing';

@NgModule({
  imports: [
    CommonModule,SharedModule,MessageModule,PickupagentReturnRoutes
  ],
  declarations: [PickupagentReturnComponent]
})
export class PickupagentReturnModule { }
