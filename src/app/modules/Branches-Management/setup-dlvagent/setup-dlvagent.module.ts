import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupDlvagentComponent } from './setup-dlvagent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupDlvagentRoutingModule } from './setup-dlvagent-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SetupDlvagentRoutingModule
  ],
  declarations: [SetupDlvagentComponent]
})
export class SetupDlvagentModule { }
