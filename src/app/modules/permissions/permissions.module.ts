import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PermissionsRoutingModule} from './permissions-routing.module';
import {PermissionsComponent} from './permissions.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        PermissionsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PermissionsRoutingModule
    ]
})
export class PermissionsModule {
}
