import { Component, OnInit } from '@angular/core';
import { Safe } from 'src/app/shared/Apis/safe';

@Component({
    selector: 'app-safe',
    templateUrl: './safe.component.html',
    styleUrls: ['./safe.component.scss'],
})
export class SafeComponent implements OnInit {
    visible: boolean = false;

    products = [
        {
            transactionType: 'DB_SAFE',
            transactionName: 'ADD_SAFE',
            transactionEntity: '12040',
            transactionAmountIQD: 123123,
            transactionAmountUSD: 1000,
            notes: 'the ttttttttttttttttttttttttttt',
            accountantBoxId: 2112,
        },
    ];
    constructor(private safe: Safe) {}

    ngOnInit() {
        this.safe.getAllSafe().subscribe((res: any) => {
            console.log(res);
        });
    }
    showDialog() {
        this.visible = true;
    }
}
