import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupCustomersComponent } from './setup-customers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupCustomersRoutingModule } from './setup-customers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SetupCustomersRoutingModule
  ],
  declarations: [SetupCustomersComponent]
})
export class SetupCustomersModule { }
