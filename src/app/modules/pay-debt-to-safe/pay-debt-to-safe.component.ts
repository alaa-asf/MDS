import { Component, OnInit } from '@angular/core';
import { SafeService } from 'src/app/shared/Apis/safe.service';

@Component({
  selector: 'app-pay-debt-to-safe',
  templateUrl: './pay-debt-to-safe.component.html',
  styleUrls: ['./pay-debt-to-safe.component.scss']
})
export class PayDebtToSafeComponent implements OnInit {
  debtList: any = [];
  debtsValue: any;
  debtValue: any;
  showDebtInfo: boolean = false
  constructor(private safe: SafeService) { }

  ngOnInit() {
    this.getAllDebt();
    this.getDebtTotal();
  }

  getAllDebt() {
    this.safe.getAllDebt().subscribe((res: any) => {
      this.debtList = res;
    })
  }

  getDebtTotal() {
    this.safe.getTotalDebt().subscribe((res: any) => {
      this.debtsValue = res.value;
    })
  }

  showInfoDebt(id: any) {
    this.showDebtInfo = true;
    this.safe.getDebtInfo(id).subscribe((res: any) => {
      this.debtValue = res;
    })
  }
}
