import { Component, OnInit } from '@angular/core';
import { Safe } from 'src/app/shared/Apis/safe';

@Component({
    selector: 'app-safe',
    templateUrl: './safe.component.html',
    styleUrls: ['./safe.component.scss'],
})
export class SafeComponent implements OnInit {
    visible: boolean = false;
    safeBalanceIQD: string = '';
    safeBalanceUSD: string = '';
    products: [] = [];
    transactionTypes = [
        { name: 'ايداع', value: 'CR_SAFE' },
        { name: 'سحب', value: 'DB_SAFE' },
    ];
    transactionType: any = { name: 'ايداع', value: 'CR_SAFE' };
    transactionNames: any;
    transactionName: any;
    transactionSides: any;
    transactionSide: any;
    newSafe: any = {
        transactionType: "DB_SAFE",
        transactionName: "ADD_SAFE",
        transactionEntity: "12040",
        transactionAmountIQD: 123123,
        transactionAmountUSD: 1000,
        notes: "the ttttttttttttttttttttttttttt",
        accountantBoxId: 2012
    }
    constructor(private safe: Safe) { }

    ngOnInit() {
        this.safe.getAllSafe().subscribe((res: any) => {
            console.log(res);
            this.products = res;
        });
        this.safe.getSafeBalance().subscribe((res: any) => {
            this.safeBalanceIQD = res.safeBalanceIQD;
            this.safeBalanceUSD = res.safeBalanceUSD;
        })
        this.gettransactionSides();
        this.getTransactionName(this.transactionType);
    }
    showDialog() {
        this.visible = true;
    }

    getName(name: any) {
        console.log(name);

    }
    getType(type: any) {
        console.log(type);

    }
    getTransactionName(transactionType: any) {
        console.log(transactionType);

        this.safe.getTransactionName(transactionType.value).subscribe(data => {
            console.log(data);
            this.transactionNames = data;

        })
    }

    gettransactionSides() {
        this.safe.getAllacctbox().subscribe(data => {
            this.transactionSides = data;
            console.log(data);

        })
    }

    addSafe() {
        this.newSafe.transactionType = this.transactionType.value;
        this.newSafe.transactionName = this.transactionName;
        this.newSafe.transactionEntity = this.transactionName;
        this.newSafe.transactionAmountIQD = this.transactionName;
        this.newSafe.transactionAmountUSD = this.transactionName;
        this.newSafe.notes = this.transactionName;
        this.newSafe.accountantBoxId = this.transactionName;
        this.safe.addSafe(this.newSafe).subscribe(res => {
            console.log(res);
        })
    }


}
