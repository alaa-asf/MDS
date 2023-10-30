import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptsBooksOldSystemComponent } from './receipts-books-old-system.component';

const routes: Routes = [
    {
        path:'',
        component:ReceiptsBooksOldSystemComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptsBooksOldSystemRoutingModule { }
