import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupUsersComponent } from './setup-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupUsersRoutingModule } from './setup-users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SetupUsersRoutingModule
  ],
  declarations: [SetupUsersComponent]
})
export class SetupUsersModule { }
