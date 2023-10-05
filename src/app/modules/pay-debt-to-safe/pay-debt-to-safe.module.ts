import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayDebtToSafeComponent } from './pay-debt-to-safe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagesModule } from 'primeng/messages';
import { PayDebtToSafeRoutes } from './pay-debt-to-safe.routing';

@NgModule({
    imports: [CommonModule, SharedModule, MessagesModule, PayDebtToSafeRoutes],
    declarations: [PayDebtToSafeComponent],
})
export class PayDebtToSafeModule {}
