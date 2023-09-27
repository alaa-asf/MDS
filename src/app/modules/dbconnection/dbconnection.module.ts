import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DbconnectionRoutingModule} from './dbconnection-routing.module';
import {DbconnectionComponent} from './dbconnection.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        DbconnectionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DbconnectionRoutingModule
    ]
})
export class DbconnectionModule {
}
