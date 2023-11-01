import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloperationsRoutingModule } from './alloperations-routing.module';
import { AlloperationsComponent } from './alloperations.component';
import {SharedModule} from "../../../shared/shared.module";
import {PanelModule} from "primeng/panel";
import { StagesComponent } from './stages/stages.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import { PrintManifestComponent } from './print-manifest/print-manifest.component';


@NgModule({
  declarations: [
    AlloperationsComponent,
    StagesComponent,
    PrintManifestComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        AlloperationsRoutingModule,
        PanelModule,
        BreadcrumbModule
    ]
})
export class AlloperationsModule { }
