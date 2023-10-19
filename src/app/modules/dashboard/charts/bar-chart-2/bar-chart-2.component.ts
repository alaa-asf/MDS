import { Component, OnInit, Input, Injector } from '@angular/core';
import * as moment from 'moment/moment';
import { BrancheService } from 'src/app/shared/Apis/branche.service';
import { ReportsService } from 'src/app/shared/Apis/reports.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'app-bar-chart-2',
    templateUrl: './bar-chart-2.component.html',
    styleUrls: ['./bar-chart-2.component.scss'],
})
export class BarChart2Component extends BaseComponent implements OnInit {
    @Input() title: any;
    chartData: any;
    options: any;

    mapFilter: any = 4;
    mapFilters: any;
    new_Date: Date = new Date();
    rangeDates: any = [];
    mapLoading = true;
    constructor(
        injector: Injector,
        private _branchService: BrancheService,
        private _reportsService: ReportsService
    ) {
        super(injector);
        this.rangeDates = [
            new Date(moment(this.new_Date).subtract(1, 'years').format()),
            this.new_Date,
        ];
        this.getBranchesByUserId();
    }

    ngOnInit() {
        let filter = {
            startDate: '2023-03-27 ',
            endDate: '2024-06-11 ',
            branchId: 4,
        };
        this.getPickUpAgentOrders(filter);
        this.chartData = {
            labels: [

            ],
            datasets: [
                {
                    label: ' عدد الشحنات التامة',
                    backgroundColor: 'lightblue',
                    borderColor: 'blue',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'عدد الشحنات الراجعة',
                    backgroundColor: '#FF95B9',
                    borderColor: '#FF48C1',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ],
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: 'black',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 500,
                        },
                    },
                },
                y: {
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 500,
                        },
                    },
                },
            },
        };
    }

    getBranchesByUserId() {
        this._branchService.getBranchesByUserId().subscribe((data: any) => {
            this.mapFilters = data;
        });
    }

    getPickUpAgentOrders(filter: any) {
        this.mapLoading = true;
        this._reportsService
            .getPickUpAgentOrders(filter)
            .subscribe((orders: any) => {
                orders.forEach((order: any) => {
                    if (order.agentName)
                        this.chartData.labels.push(order.agentName);

                    this.chartData.datasets[0].data.push(
                        order.assignedToAgentCount
                    );
                    this.chartData.datasets[1].data.push(
                        order.returnedToAgentCount
                    );
                });
                this.mapLoading = false;
            });
    }
}
