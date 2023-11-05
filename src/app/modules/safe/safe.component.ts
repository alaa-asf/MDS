import { Component, OnInit } from '@angular/core';
import { SafeService } from 'src/app/shared/Apis/safe.service';
import {
    ConfirmationService,
    MessageService,
    ConfirmEventType,
} from 'primeng/api';
import { BrancheService } from 'src/app/shared/Apis/branche.service';

@Component({
    selector: 'app-safe',
    templateUrl: './safe.component.html',
    styleUrls: ['./safe.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class SafeComponent implements OnInit {
    visible: boolean = false;
    confirmDelete: boolean = false;
    safeBalanceIQD: string = '';
    safeBalanceUSD: string = '';
    transactions: any = [];
    transactionTypes = [
        { name: 'ايداع', value: 'CR_SAFE' },
        { name: 'سحب', value: 'DB_SAFE' },
    ];
    transactionType: any = { name: 'ايداع', value: 'CR_SAFE' };
    transactionNames: any;
    transactionName: any;
    transactionSides: any;
    transactionSide: any;
    transactionID: any;
    transactionUS: any;
    transactionNote: string = '';
    branchUsed: any;
    userUsed: any;
    newSafe: any = {
        "transactionType": "DB_SAFE",
        "transactionAmountIQD": 10000,
        "transactionAmountUSD": 1000,
        "notes": "noooottttteeeeeeee"
    };
    constructor(
        private safe: SafeService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private branchService: BrancheService
    ) { }

    ngOnInit() {
        this.getAllTransactions();
        this.getSafeBalance();
        this.gettransactionSides();
        this.getTransactionName(this.transactionType);
        this.getBranchNameByLogIn();
    }

    showDialog() {
        this.visible = true;
    }

    getName(name: any) {
    }
    getType(type: any) {
        this.getTransactionName(type)
    }
    getTransactionName(transactionType: any) {
        this.safe
            .getTransactionName(transactionType.value)
            .subscribe((data: any) => {
                let newArray = data.map((value: any, index: any) => {
                    return {
                        id: index,
                        transactionActionId: value.transactionActionId,
                        name: value.name
                    };
                });
                this.transactionNames = newArray;
                this.transactionNames = this.transactionNames.filter((item: any) => item.transactionActionId !== 122);
                this.transactionName = this.transactionNames[0];
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
            this.transactionSide = this.transactionSides[0];
        });
    }

    addSafe() {
        let transaction = {
            "transactionType": this.transactionType.value,
            "transactionAmountIQD": this.transactionID,
            "transactionAmountUSD": this.transactionUS,
            "notes": this.transactionNote
        }

        if (this.transactionType.value == 'DB_SAFE' && (this.transactionID >= this.safeBalanceIQD || this.transactionUS >= this.safeBalanceUSD)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'لا يمكن اجراء هذه العملية لانه لا يوجد رصيد كافي في القاصة !',
            });
        } else {
            this.safe.addSafe(transaction, this.transactionName.id, this.transactionSide.id).subscribe((res) => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'تمت عملية الاضافة',
                });
                this.getAllTransactions();
                this.getSafeBalance();
                this.visible = false;
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'حدث خطأ ما',
                });
            });
        }
    }

    archiveSafe() {
        this.safe.archiveSafe().subscribe((res: any) => {
            this.getAllTransactions();
            this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'تم جرد القاصة',
            });
        });
    }

    deleteTransaction(id: any) {
        this.confirmDelete = true;
    }

    confirmDeleteTransaction(id: any) {
        this.confirmationService.confirm({
            accept: () => {
                this.safe.deleteTransaction(id).subscribe((res: any) => {
                    this.confirmDelete = false;
                });
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'تم حذف الاجراء',
                });
                this.transactions = this.transactions.filter((item: any) => item.safeId !== id);
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

    getAllTransactions() {
        this.safe.getAllSafe().subscribe((res: any) => {
            // this.transactions = res;
            this.transactions = res.sort((a: any, b: any) => {
                return b.safeId - a.safeId;
            });
        });
    }

    getSafeBalance() {
        this.safe.getSafeBalance().subscribe((res: any) => {
            this.safeBalanceIQD = res.safeBalanceIQD;
            this.safeBalanceUSD = res.safeBalanceUSD;
        });
    }

    getBranchNameByLogIn() {
        this.branchService.getBranchNameByLogIn().subscribe((res: any) => {
            this.branchUsed = res.name;
        })
        this.branchService.getUserNameByLogIn().subscribe((res: any) => {
            this.userUsed = res.name;
        })

    }
}
