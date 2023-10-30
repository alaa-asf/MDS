import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng.module';
import { DatomSpinnerComponent } from './components/datom-spinner/datom-spinner.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FilterDate , FilterDate2 } from './pipe-service/filter-date.pipe';

@NgModule({
    declarations: [DatomSpinnerComponent, FilterDate, FilterDate2],
    imports: [CommonModule, PrimeNgModule, HighchartsChartModule],
    providers: [FilterDate , FilterDate2],
    exports: [
        PrimeNgModule,
        DatomSpinnerComponent,
        HighchartsChartModule,
        FilterDate,
        FilterDate2
    ],
})
export class SharedModule {}
