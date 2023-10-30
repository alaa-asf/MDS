import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupStateComponent } from './setup-state.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupStateRoutingModule } from './setup-state-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SetupStateRoutingModule
  ],
  declarations: [SetupStateComponent]
})
export class SetupStateModule { }
