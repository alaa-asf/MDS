import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReturnablesService {
    constructor(private httpClient: HttpClient) {}

    getPickupAgent() {
        return this.httpClient.get(`${environment.apiUrl}/branch/pickupAgent`);
    }
    getDeliveryAgents() {
        return this.httpClient.get(
            `${environment.apiUrl}/branch/delivery-agents`
        );
    }
    getBranchCustomers() {
        return this.httpClient.get(
            `${environment.apiUrl}/customers/branch-customers`
        );
    }

    getAgentsCases(agentAcc: any) {
        return this.httpClient.get(
            `${environment.apiUrl}/financials/agent/Cases?agentAcc=${agentAcc}`
        );
    }

    // getSummaryData() {
    //     return this.httpClient.get(environment.apiUrl + '/PCases/logistics?')
    // }
    // getCasesByStageAndStep(stage:any,step:any) {
    //     return this.httpClient.get(environment.apiUrl + `/PCases/getCasesByStageAndStep?stage=${stage}&step=${step}`)
    // }
    // getCaseFilterd(filters:any) {
    //     return this.httpClient.post(environment.apiUrl + `/PCases/get_case_filterd`,filters)
    // }
    // getDecisionsByStep(step:any) {
    //     return this.httpClient.get(environment.apiUrl + `/PCases/getDecisionsByStep?stepId=${step}`)
    // }
    // addNewCase(shipment:any){
    //     return this.httpClient.post(environment.apiUrl + `/PCases`,shipment)
    // }
}
