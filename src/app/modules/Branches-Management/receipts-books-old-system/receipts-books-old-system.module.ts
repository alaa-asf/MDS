import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsBooksOldSystemComponent } from './receipts-books-old-system.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReceiptsBooksOldSystemRoutingModule } from './receipts-books-old-system-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReceiptsBooksOldSystemRoutingModule
  ],
  declarations: [ReceiptsBooksOldSystemComponent]
})
export class ReceiptsBooksOldSystemModule { }
