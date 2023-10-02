import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtnBarcodeIsolatorComponent } from './rtn-barcode-isolator.component';
import { MessageModule } from 'primeng/message';
import { SharedModule } from '../../shared/shared.module';
import { RtnBarcodeIsolatorRoutes } from './rtn-barcode-isolator.routing';

@NgModule({
  imports: [
    CommonModule,SharedModule,MessageModule,RtnBarcodeIsolatorRoutes
  ],
  declarations: [RtnBarcodeIsolatorComponent]
})
export class RtnBarcodeIsolatorModule { }
