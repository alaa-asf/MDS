import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeCashTransReportComponent } from './safe-cash-trans-report.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { SafeCashTransReportRoutes } from './safe-cash-trans-report.routing';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MessageModule,
        SafeCashTransReportRoutes,
    ],
    declarations: [SafeCashTransReportComponent],
})
export class SafeCashTransReportModule {}
