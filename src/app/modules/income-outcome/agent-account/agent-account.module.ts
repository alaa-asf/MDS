import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentAccountRoutingModule } from './agent-account-routing.module';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgentAccountRoutingModule,
      SharedModule
  ]
})
export class AgentAccountModule { }
