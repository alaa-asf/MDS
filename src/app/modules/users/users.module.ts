import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {SharedModule} from "../../shared/shared.module";
import {MessageModule} from "primeng/message";


@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        MessageModule
    ]
})
export class UsersModule {
}
