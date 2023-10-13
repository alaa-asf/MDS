import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
    @Input() data: any;
    @Input() title: any;
    // data: any;
    options: any;
    constructor() {

    }

    ngOnInit() {
        // this.data = {
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
        //             data: [65, 59, 80, 81, 56, 55, 40],
        //         },
        //         {
        //             label: 'My Second dataset',
        //             backgroundColor: 'pink',
        //             borderColor: 'green',
        //             data: [28, 48, 40, 19, 86, 27, 90],
        //         },
        //     ],
        // };

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
}
