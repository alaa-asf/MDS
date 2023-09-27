import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MerchantsRoutingModule} from './merchants-routing.module';
import {MerchantsComponent} from './merchants.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        MerchantsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MerchantsRoutingModule
    ]
})
export class MerchantsModule {
}
