import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'filterDate' })
export class FilterDate implements PipeTransform {
    transform(element: any) {

        var d = new Date(element),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('/');
    }
}