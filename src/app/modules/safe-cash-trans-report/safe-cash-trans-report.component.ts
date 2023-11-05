import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { SafeService } from 'src/app/shared/Apis/safe.service';
import { FilterDate2 } from 'src/app/shared/pipe-service/filter-date.pipe';

@Component({
  selector: 'app-safe-cash-trans-report',
  templateUrl: './safe-cash-trans-report.component.html',
  styleUrls: ['./safe-cash-trans-report.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SafeCashTransReportComponent implements OnInit {
  transactions: any = [];
  transactionTypes = [
    { name: 'ايداع', value: 'CR_SAFE' },
    { name: 'سحب', value: 'DB_SAFE' },
  ];
  transactionType: any;
  transactionSides: any;
  transactionSide: any;
  fromDate: any;
  toDate: any;
  constructor(private safe: SafeService, private confirmationService: ConfirmationService,
    private messageService: MessageService, private pipe: FilterDate2) { }

  ngOnInit() {
    this.gettransactionSides();
    this.safe.getAllSafe().subscribe((res: any) => {
      this.transactions = res;
    });
  }

  getAllTransactions() {
    let filter = {
      "transactionType": this.transactionType.value,
      "fromDate": this.pipe.transform(this.fromDate),
      "toDate": this.pipe.transform(this.toDate),
      "transactionEntityId": this.transactionSide.id
    }
    this.safe.getAllSafe(filter).subscribe((res: any) => {
      // console.log(res);
      this.transactions = res;
    });
  }

  confirmDeleteTransaction(id: any) {
    this.confirmationService.confirm({
      accept: () => {
        this.safe.deleteTransaction(id).subscribe((res: any) => {

        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'تم حذف الاجراء',
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  gettransactionSides() {
    this.safe.getAllEntities().subscribe((data: any) => {
      const newArray = data.map((value: any, index: any) => {
        return {
          id: index,
          accountant: value
        };
      });
      this.transactionSides = newArray;
    });
  }

  cancleSearch() {
    this.transactionType = {}, this.fromDate = '', this.toDate = '', this.transactionSide = {}
  }
  
  onSelectTransactionTypes(value: any) {
    console.log(value);
  }
}
