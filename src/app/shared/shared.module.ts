import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng.module';
import { DatomSpinnerComponent } from './components/datom-spinner/datom-spinner.component';
import {HighchartsChartModule} from "highcharts-angular";
import { FilterDate } from './pipe-service/filter-date.pipe';



@NgModule({
  declarations: [DatomSpinnerComponent,FilterDate],
  imports: [
    CommonModule,
    PrimeNgModule,
      HighchartsChartModule,

  ],
  providers: [
    FilterDate
],
  exports:[PrimeNgModule,DatomSpinnerComponent,HighchartsChartModule,FilterDate]
})
export class SharedModule { }
