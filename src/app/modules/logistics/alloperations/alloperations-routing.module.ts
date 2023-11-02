import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlloperationsComponent} from "./alloperations.component";
import {StagesComponent} from "./stages/stages.component";
import {PrintManifestComponent} from "./print-manifest/print-manifest.component";
import {LIAISONAGTNEWONWAYComponent} from "./liaisonagt-newonway/liaisonagt-newonway.component";
import {RTNWITHLIAISONAGENTComponent} from "./rtn-withliaisonagent/rtn-withliaisonagent.component";
import {RTNINSTOREWAITLIAISONComponent} from "./rtn-instore-waitliaison/rtn-instore-waitliaison.component";

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
        path:'BRANCHES/MANIFEST_BRANCHES',
        component:PrintManifestComponent
    },
    {
        path:'BRANCHES/RTN_MANIFEST_LIAISON',
        component:PrintManifestComponent
    },

    {
        path:'BRANCHES/LIAISONAGT_NEWONWAY',
        component:LIAISONAGTNEWONWAYComponent
    },
    {
        path:'BRANCHES/RTN_WITHLIAISONAGENT',
        component:RTNWITHLIAISONAGENTComponent
    },
    {
        path:'BRANCHES/RTN_INSTORE_WAITLIAISON',
        component:RTNINSTOREWAITLIAISONComponent
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
