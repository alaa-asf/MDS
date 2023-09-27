import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllDataRoutingModule } from './all-data-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {AllDataComponent} from "./all-data.component";


@NgModule({
  declarations: [AllDataComponent],
  imports: [
    CommonModule,
      SharedModule,
      AllDataRoutingModule
  ]
})
export class AllDataModule { }
