import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlloperationsComponent} from "./alloperations.component";
import {StagesComponent} from "./stages/stages.component";
import {PrintManifestComponent} from "./print-manifest/print-manifest.component";

const routes: Routes = [
    {
        path:'',
        component:AlloperationsComponent
    },
    {
        path:'INIT/PRINTMANIFEST',
        component:PrintManifestComponent
    },
    {
        path:':stage/:step',
        component:StagesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlloperationsRoutingModule { }
