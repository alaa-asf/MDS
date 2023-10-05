import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchReturnablesComponent } from './branch-returnables.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { BranchReturnablesRoutes } from './branch-returnables.routing';


@NgModule({
  imports: [
    CommonModule,SharedModule,MessageModule,BranchReturnablesRoutes
  ],
  declarations: [BranchReturnablesComponent]
})
export class BranchReturnablesModule { }
