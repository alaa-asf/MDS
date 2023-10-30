import { Component, OnInit } from '@angular/core';
import { SafeService } from 'src/app/shared/Apis/safe.service';
import { FilterDate } from 'src/app/shared/pipe-service/filter-date.pipe';

@Component({
  selector: 'app-out-box-transactions',
  templateUrl: './out-box-transactions.component.html',
  styleUrls: ['./out-box-transactions.component.scss']
})
export class OutBoxTransactionsComponent implements OnInit {
  fromDate: any
  toDate: any
  safeBox: any
  nameSafeBox: any
  safeName: any
  disabledButton: boolean = true
  progressSpinner: boolean = false
  persons: any = []
  products: any = []
  constructor(private safe: SafeService, private pipe: FilterDate) { }

  ngOnInit() {
    this.safe.getAllacctbox().subscribe((res: any) => {
      this.persons = res

    })
  }
  clickSearch() {
    this.progressSpinner = true
    this.safe.getaccountantBoxesBranch(this.safeBox, this.pipe.transform(this.fromDate), this.pipe.transform(this.toDate)).subscribe((res: any) => {
      // console.log(res);
      this.products = res
      this.progressSpinner = false
    })

  }
  ngDoCheck() {
    if (this.toDate && this.fromDate && this.safeBox) {
      this.disabledButton = false
    }
  }
  onChange(event: any) {
    // console.log(event);
    this.safeBox = event.boxId
    this.nameSafeBox = event.accountant
  }
  cancleSearch() {
    this.toDate = '', this.fromDate = '', this.safeName = '', this.disabledButton = true

  }

}
