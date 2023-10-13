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
    products = [

    ];
    constructor(private safe: Safe) { }

    ngOnInit() {
        this.safe.getAllSafe().subscribe((res: any) => {
            console.log(res);

            this.products = res
           

        });
        this.safe.getSafeBalance().subscribe((res: any) => {
            this.safeBalanceIQD = res.safeBalanceIQD
            this.safeBalanceUSD = res.safeBalanceUSD
        })
    }
    showDialog() {
        this.visible = true;
    }
  
}
