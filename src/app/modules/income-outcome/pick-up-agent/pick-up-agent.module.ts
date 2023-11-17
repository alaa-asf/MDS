import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickUpAgentRoutingModule } from './pick-up-agent-routing.module';
import {PickUpAgentComponent} from "./pick-up-agent.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [PickUpAgentComponent],
  imports: [
    CommonModule,
      SharedModule,
    PickUpAgentRoutingModule
  ]
})
export class PickUpAgentModule { }
