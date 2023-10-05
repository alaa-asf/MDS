import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutBoxTransactionsComponent } from './out-box-transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { OutBoxTransactionsRoutes } from './out-box-transactions.routing';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MessageModule,
        OutBoxTransactionsRoutes,
    ],
    declarations: [OutBoxTransactionsComponent],
})
export class OutBoxTransactionsModule {}
