import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/shared/Apis/reports.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    parentData1: any;
    parentData2: any;
    title1: any = "عدد الشحنات المدخلة";
    title2: any = "تقرير الشحنات لمندوب الاستلام";
    constructor(private _reportsService: ReportsService) {
    //   let filter ={
    //     "startDate": "2023-03-27 ",
    //     "endDate": "2024-06-11 ",
    //     "branchId":4
    //   }
    //   this.getOrdersData(filter);
    //   this.getInsertedOrders(filter);
    //   this.getPickUpAgentOrders(filter);
    }

    ngOnInit() {


    //   this.parentData1 = {
    //     labels: [
    //         'January',
    //         'February',
    //         'March',
    //         'April',
    //         'May',
    //         'June',
    //         'July',
    //     ],
    //     datasets: [
    //         {
    //             label: 'My First dataset',
    //             backgroundColor: 'lightblue',
    //             borderColor: 'blue',
    //             daِta: [65, 59, 80, 81, 56, 55, 40],
    //         },
    //         {
    //             label: 'My Second dataset',
    //             backgroundColor: 'pink',
    //             borderColor: 'green',
    //             data: [28, 48, 40, 19, 86, 27, 90],
    //         },
    //     ],
    // };
    // this.parentData2 = this.parentData1;
    }
}