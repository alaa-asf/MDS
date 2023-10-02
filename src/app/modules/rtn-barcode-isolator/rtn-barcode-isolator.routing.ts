import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RtnBarcodeIsolatorComponent } from './rtn-barcode-isolator.component';

const routes: Routes = [
  {
      path: '',
      component: RtnBarcodeIsolatorComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RtnBarcodeIsolatorRoutes {}
