import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        RolesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RolesRoutingModule
    ]
})
export class RolesModule {
}
