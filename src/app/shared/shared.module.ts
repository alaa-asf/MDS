import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './primeng.module';
import { DatomSpinnerComponent } from './components/datom-spinner/datom-spinner.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
    declarations: [DatomSpinnerComponent],
    imports: [CommonModule, PrimeNgModule, HighchartsChartModule],
    exports: [PrimeNgModule, DatomSpinnerComponent, HighchartsChartModule],
})
export class SharedModule {}
