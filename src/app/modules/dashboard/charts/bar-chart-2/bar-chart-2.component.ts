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
    data: any;
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
    }

    ngOnInit() {
        this.mapLoading = true;
        this.getBranchesByUserId();
        let filter = {
            startDate: '2023-03-27 ',
            endDate: '2024-06-11 ',
            branchId: 4,
        };
        this.getPickUpAgentOrders(filter);
        this.data = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'الطلبات المرسلة الى العملاء',
                    backgroundColor: 'lightblue',
                    borderColor: 'blue',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'الطلبات المسترجعة   ',
                    backgroundColor: 'pink',
                    borderColor: 'green',
                    data: [28, 48, 40, 19, 86, 27, 90],
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

        console.log(this.data);
        console.log(this.title);
    }

    getBranchesByUserId() {
        this._branchService.getBranchesByUserId().subscribe((data: any) => {
            this.mapFilters = data;
        });
    }

    getMapData(type: number = 1) {
        let filter = {
            startDate:
                this.rangeDates && this.rangeDates[0]
                    ? this.utility.convertDate(this.rangeDates[0])
                    : null,
            endDate:
                this.rangeDates && this.rangeDates[1]
                    ? this.utility.convertDate(this.rangeDates[1])
                    : null,
            branchId: 0,
        };

        this.mapLoading = true;
        if (type) {
            // @ts-ignore
            this.mapOptions.series[0].tooltip = {
                headerFormat:
                    '<span style="font-size:12px;font-weight:600">{series.name}</span><br/>',
                pointFormatter: function () {
                    return (
                        'الطلبات الناجحة: ' +
                        this.value +
                        ' - الطلبات الملغاة: ' +
                        this.value2
                    );
                },
            };
        }
        // @ts-ignore
        // this.mapOptions.series[0].dataLabels={
        //     enabled: true,
        //     formatter: function() {
        //         return convertCodeToState(this.point['hc-key'])
        //     }
        // }
        filter.branchId = this.mapFilter.branchId;
        //     this._reportsService.getOrders(filter).subscribe(el => {
        //       console.log(filter);

        //       this.mapLoading = false
        //       this.cdr.detectChanges();
        //       this.updateMapData(el);
        //   })
        // switch (type) {
        //     case 'Merchants':
        //         this._reportsService.getOrders(filter).subscribe(el => {
        //             this.mapLoading = false
        //             this.cdr.detectChanges();
        //             this.updateMapData(el);
        //         })
        //         break;
        //     case 'Customers':
        //         this._reportsService.getOrders(filter).subscribe(el => {
        //             this.mapLoading = false
        //             this.cdr.detectChanges();
        //             this.updateMapData(el)
        //         })
        //         break;
        //     case 'Orders':
        //         this._reportsService.getOrders(filter).subscribe(el => {
        //             this.mapLoading = false
        //             this.cdr.detectChanges();
        //             this.updateMapData(el, 'deliveredCount')
        //         })
        //         break;
        //     case 'Financial-Info':
        //         this._reportsService.getOrders(filter).subscribe(el => {
        //             this.mapLoading = false
        //             this.cdr.detectChanges();
        //             this.updateMapData(el, 'totalReceiptAmount')

        //         })
        //         break;
        // }
    }

    getPickUpAgentOrders(filter: any) {
        this._reportsService.getPickUpAgentOrders(filter).subscribe((data) => {
            console.log(data);
        });
    }
}
