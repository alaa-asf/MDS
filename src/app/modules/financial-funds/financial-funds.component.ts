import { Component, OnInit } from '@angular/core';
import { SafeService } from 'src/app/shared/Apis/safe.service';

@Component({
    selector: 'app-financial-funds',
    templateUrl: './financial-funds.component.html',
    styleUrls: ['./financial-funds.component.scss'],
})
export class FinancialFundsComponent implements OnInit {
    products = [];
    loading=true
    constructor(private safe: SafeService) {}

    ngOnInit() {
        this.safe.getAllEntities().subscribe((data: any) => {
            this.products = data;
            this.loading = false
        },()=>{
            this.loading = false
        });
    }
}
