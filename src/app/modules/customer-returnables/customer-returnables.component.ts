import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({
    selector: 'app-customer-returnables',
    templateUrl: './customer-returnables.component.html',
    styleUrls: ['./customer-returnables.component.scss'],
})
export class CustomerReturnablesComponent implements OnInit {
    products: any = [];
    customer: any;
    customers: any;
    constructor(private _returnablesService: ReturnablesService) {}

    ngOnInit() {
        this._returnablesService.getBranchCustomers().subscribe((data) => {
            this.customers = data;
        });
    }

    getData(filter: any) {
      
    }
}
