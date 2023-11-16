import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PickUpAgentService {

    constructor(private httpClient: HttpClient) {

    }
    getAllPickupAgentByBranchAndRank(body:any){
        return this.httpClient.post(environment.apiUrl + '/users/getAllPickupAgentByBranchAndRank',body)
    }
    getTransactions(id:any) {
        return this.httpClient.get(environment.apiUrl + '/financials/PickUpAgent/transactions?pickUpAgentId='+id)
    }

    getCustomersOrders(id:any) {
        return this.httpClient.get(environment.apiUrl + '/financials/PickUpAgent/Cases?pickUpAgentId='+id)
    }

    payment(data:any) {
        return this.httpClient.post(environment.apiUrl + '/financials/PickUpAgent/payment',data)
    }
}
