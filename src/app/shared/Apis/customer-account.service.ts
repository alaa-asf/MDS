import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {

    constructor(private httpClient: HttpClient) {

    }

    getTransactions(id:any) {
        return this.httpClient.get(environment.apiUrl + '/financials/customer/transactions?customerId='+id)
    }

    getCustomersOrders(id:any) {
        return this.httpClient.get(environment.apiUrl + '/financials/customer/Cases?customerId='+id)
    }

    payment(data:any) {
        return this.httpClient.post(environment.apiUrl + '/financials/customer/payment',data)
    }
}
