import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialFundsComponent } from './financial-funds.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { FinancialFundsRoutes } from './financial-funds.routing';
@NgModule({
    imports: [CommonModule, MessageModule, SharedModule, FinancialFundsRoutes],
    declarations: [FinancialFundsComponent],
})
export class FinancialFundsModule {}
