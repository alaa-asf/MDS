import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupDistrictComponent } from './setup-district.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupDistrictRoutingModule } from './setup-district-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SetupDistrictRoutingModule
  ],
  declarations: [SetupDistrictComponent]
})
export class SetupDistrictModule { }
