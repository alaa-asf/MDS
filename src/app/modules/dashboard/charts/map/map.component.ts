import {
    ChangeDetectorRef,
    Component,
    Injector,
    OnInit,
    ViewChild,
} from '@angular/core';
import HC_map from 'highcharts/modules/map';
import * as Highcharts from 'highcharts';
import * as moment from 'moment/moment';
import iraqMap from '@highcharts/map-collection/countries/iq/iq-all.geo.json';
import { ReportsService } from 'src/app/shared/Apis/reports.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { state } from 'src/app/shared/constant/states';
import { BrancheService } from 'src/app/shared/Apis/branche.service';
HC_map(Highcharts);
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent extends BaseComponent implements OnInit {
    @ViewChild('map', { static: false }) map: any;
    mapFilter: any = 4;
    updateFlag = false;
    mapFilters: any;
    rangeDates: any = [];
    new_Date: Date = new Date();
    mapLoading = true;

    constructor(
        injector: Injector,
        private cdr: ChangeDetectorRef,
        private _reportsService: ReportsService,
        private _branchService: BrancheService
    ) {
        super(injector);
        this.rangeDates = [
            new Date(moment(this.new_Date).subtract(1, 'years').format()),
            this.new_Date,
        ];
    }
    getMapData(type: any = {}) {
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
        // @ts-ignore
        this.mapOptions.series[0].name = type.name;
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
        this.mapOptions.series[0].dataLabels = {
            enabled: true,
            formatter: function () {
                return convertCodeToState(this.point['hc-key']);
            },
        };
        this.updateFlag = true;
        filter.branchId = this.mapFilter.branchId;
        this._reportsService.getOrders(filter).subscribe((el) => {
            this.mapLoading = false;
            this.cdr.detectChanges();
            this.updateMapData(el);
        });
    }

    updateMapData(data: any, key: string = 'count') {
        const chart = this.map.chart;
        const series = chart.series[0];
        const colorAxis = chart.colorAxis;
        let newData: any = [
            { 'hc-key': 'iq-na', value: 0, value1: 0 },
            { 'hc-key': 'iq-ka', value: 0, value2: 0 },
            { 'hc-key': 'iq-ba', value: 0, value2: 0 },
            { 'hc-key': 'iq-mu', value: 0, value2: 0 },
            { 'hc-key': 'iq-qa', value: 0, value2: 0 },
            { 'hc-key': 'iq-dq', value: 0, value2: 0 },
            { 'hc-key': 'iq-ma', value: 0, value2: 0 },
            { 'hc-key': 'iq-wa', value: 0, value2: 0 },
            { 'hc-key': 'iq-sd', value: 0, value2: 0 },
            { 'hc-key': 'iq-su', value: 0, value2: 0 },
            { 'hc-key': 'iq-di', value: 0, value2: 0 },
            { 'hc-key': 'iq-bb', value: 0, value2: 0 },
            { 'hc-key': 'iq-bg', value: 0, value2: 0 },
            { 'hc-key': 'iq-an', value: 0, value2: 0 },
            { 'hc-key': 'iq-ar', value: 0, value2: 0 },
            { 'hc-key': 'iq-ts', value: 0, value2: 0 },
            { 'hc-key': 'iq-da', value: 0, value2: 0 },
            { 'hc-key': 'iq-ni', value: 0, value2: 0 },
        ];

        data.forEach((element: any) => {
            newData.forEach((el: any) => {
                if (el['hc-key'] == state[element.state]) {
                    el.value = element['deliveredCount'];
                    el.value2 = element['canceledCount'];
                }
            });
        });
        let min = newData[0].value;
        let max = newData[0].value;

        for (let i = 1; i < newData.length; i++) {
            if (newData[i].value < min) {
                min = newData[i].value;
            }
            if (newData[i].value > max) {
                max = newData[i].value;
            }
        }

        colorAxis[0].update({
            min: min,
            max: max,
        });
        series.update({
            data: JSON.parse(JSON.stringify(newData)),
        });
        this.cdr.detectChanges();
    }

    //start map options
    mapHighcharts: typeof Highcharts = Highcharts;
    chartMapConstructor = 'mapChart';
    mapOptions: Highcharts.Options = {
        chart: {
            map: iraqMap,
            backgroundColor: 'var(--surface-card)',
        },
        title: {
            text: '',
            style: {
                color: 'var(--text-color)',
            },
        },
        colorAxis: {
            min: 0,

            stops: [
                [0, '#79C9FC'],
                [1, '#0000B0'],
            ],
        },
        mapNavigation: {
            enabled: true,
            // enableMouseWheelZoom:false,
            // enableTouchZoom:false,
            buttonOptions: {
                alignTo: 'spacingBox',
            },
        },
        legend: {
            enabled: true,
        },
        series: [
            {
                type: 'map',
                name: 'this.mapFilter.name',
                states: {
                    hover: {
                        color: '#FF95B9',
                    },
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
                allAreas: false,
                data: [],
                tooltip: {},
            },
        ],
    };
    //end map option
    ngOnInit(): void {
        this.getBranchesByUserId();
    }

    getBranchesByUserId() {
        this._branchService.getBranchesByUserId().subscribe((data: any) => {
            this.mapFilters = data;
            this.mapFilter = data[0];
            this.getMapData(this.mapFilter);
        });
    }
}
function formatMoney(num: number) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}
function convertCodeToState(code: any) {
    var mapToString: any = {
        'iq-na': 'Najaf',
        'iq-ka': 'Karbala',
        'iq-ba': 'Basra',
        'iq-mu': 'Muthanna',
        'iq-qa': 'Al-Qādisiyyah',
        'iq-dq': 'Dhi Qar',
        'iq-ma': 'Maysan',
        'iq-wa': 'Wasit',
        'iq-sd': 'Salah Al-Din',
        'iq-su': 'Sulaymaniyah',
        'iq-di': 'Diyala',
        'iq-bb': 'Babil',
        'iq-bg': 'Baghdad',
        'iq-an': 'Al-Anbar',
        'iq-ar': 'Erbil',
        'iq-ts': 'Kirkuk',
        'iq-da': 'Duhok',
        'iq-ni': 'Ninawa',
    };
    return mapToString[code];
}
