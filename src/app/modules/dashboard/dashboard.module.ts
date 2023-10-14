import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapModule } from './charts/map/map.module';
import { BarChart1Component } from './charts/bar-chart-1/bar-chart-1.component';
import { BarChart2Component } from './charts/bar-chart-2/bar-chart-2.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MapModule
  ],
  declarations: [DashboardComponent, BarChart1Component, BarChart2Component ]
})
export class DashboardModule { }
