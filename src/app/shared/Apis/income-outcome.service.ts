import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class IncomeOutcomeService {

    constructor(private httpClient: HttpClient) {

    }

    AgentTransactions(id:any) {
        return this.httpClient.get(environment.apiUrl + '/transactions/agent_transactions?agentAcc='+id)
    }

    getAgentOrders(id:any) {
        return this.httpClient.get(environment.apiUrl + '/financials/agent/Cases?agentAcc='+id)
    }

    payment(data:any) {
        return this.httpClient.post(environment.apiUrl + '/financials/agent/payment',data)
    }
}
