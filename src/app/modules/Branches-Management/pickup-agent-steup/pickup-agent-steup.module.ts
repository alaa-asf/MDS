import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupAgentSteupComponent } from './pickup-agent-steup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PickupAgentSteupRoutingModule } from './pickup-agent-steup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PickupAgentSteupRoutingModule
  ],
  declarations: [PickupAgentSteupComponent]
})
export class PickupAgentSteupModule { }
