import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentReturnablesComponent } from './agent-returnables.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { AgentReturnablesRoutes } from './agent-returnables.routing';

@NgModule({
  imports: [
    AgentReturnablesRoutes, MessageModule, CommonModule, SharedModule
  ],
  declarations: [AgentReturnablesComponent]
})
export class AgentReturnablesModule { }
