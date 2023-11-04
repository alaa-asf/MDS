import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SafeService {
    constructor(private httpClient: HttpClient) { }
    safe = 'safe';
    getAllSafe(filter:any = {}) {
        return this.httpClient.post(environment.apiUrl + '/safe/index', filter)
    }
    getSafeBalance(branchId: number = 1) {
        return this.httpClient.get(environment.apiUrl + `/safe/safe-balance?branchId=${branchId}`)
    }
    getAllacctbox() {
        return this.httpClient.get(environment.apiUrl + '/accountantboxes/accountant-boxes-by-branch')
    }
    getAllEntities() {
        return this.httpClient.get(environment.apiUrl + '/safe/transaction-entities')
    }
    getaccountantBoxesBranch(boxId: any, from: any, to: any) {
        return this.httpClient.get(environment.apiUrl + `/accountantboxtransactions/transactions-by-box?boxId=${boxId}&fromDate=${from}&toDate=${to}`)
    }
    addSafe(transaction: any, transactionNameId: any, transactionEntityId: any) {
        return this.httpClient.post(environment.apiUrl + `/safe/create-safe-transaction?transactionNameId=${transactionNameId}&transactionEntityId=${transactionEntityId}`, transaction);
    }
    getTransactionName(transactionType: any) {
        return this.httpClient.get(environment.apiUrl + `/safe/transaction-name?transactionType=${transactionType}`);
    }
    archiveSafe() {
        return this.httpClient.get(environment.apiUrl + '/safe/archive-safe-transactions')
    }
    getAllDebt() {
        return this.httpClient.get(environment.apiUrl + '/safe/debt-index')
    }
    getTotalDebt() {
        return this.httpClient.get(environment.apiUrl + '/safe/total-debt')
    }
    getDebtInfo(id: any) {
        return this.httpClient.get(environment.apiUrl + `/safe/debt-details?transactionEntityId=${id}`)
    }
    deleteTransaction(id: any) {
        return this.httpClient.delete(environment.apiUrl + `/safe/delete-safe-transaction?transactionId=${id}`)
    }
}
