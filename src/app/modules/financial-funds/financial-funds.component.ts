import { Component, OnInit } from '@angular/core';
import { Safe } from 'src/app/shared/Apis/safe';

@Component({
    selector: 'app-financial-funds',
    templateUrl: './financial-funds.component.html',
    styleUrls: ['./financial-funds.component.scss'],
})
export class FinancialFundsComponent implements OnInit {
    products = [];
    constructor(private safe: Safe) {}

    ngOnInit() {
        this.safe.getAllacctbox().subscribe((res: any) => {          
            this.products = res;
        });
    }
}
