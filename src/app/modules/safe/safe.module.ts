import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeComponent } from './safe.component';
import {SharedModule} from "../../shared/shared.module";
import {MessageModule} from "primeng/message";
import { SafeRoutes } from './safe.routing';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SafeRoutes,
    MessageModule
  ],
  declarations: [SafeComponent]
})
export class SafeModule { }
