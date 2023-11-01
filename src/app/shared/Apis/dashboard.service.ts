import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient) {
    }

    getSummaryData() {
        return this.httpClient.get(environment.apiUrl + '/PCases/logistics?')
    }
    getCasesByStageAndStep(stage:any,step:any) {
        return this.httpClient.get(environment.apiUrl + `/PCases/getCasesByStageAndStep?stage=${stage}&step=${step}`)
    }
    getCaseFilterd(filters:any) {
        return this.httpClient.post(environment.apiUrl + `/PCases/get_case_filterd`,filters)
    }
    INIT_NEWINSTORE(filters:any) {
        return this.httpClient.post(environment.apiUrl + `/Flow/getCasesINI_INSTORE`,filters)
    }
    INIT_PRINTMANIFEST() {
        return this.httpClient.get(environment.apiUrl + `/Flow/getCasesINI_PRINTMINIFIST?branchId=1`)
    }
    getDataToPrintDlvAgManifest(filters:any){
        return this.httpClient.post(environment.apiUrl + `/Flow/getDataToPrintDlvAgManifest`,filters)

    }
    returnToSore(filters:any){
        return this.httpClient.put(environment.apiUrl + `/Flow/returnToSore`,filters)
    }
    getDecisionsByStep(step:any) {
        return this.httpClient.get(environment.apiUrl + `/PCases/getDecisionsByStep?stepId=${step}`)
    }
    addNewCase(shipment:any){
        return this.httpClient.post(environment.apiUrl + `/PCases`,shipment)
    }
    updateCase(data:any){
        return this.httpClient.post(environment.apiUrl + `/Flow/AgentOperations`,data)
    }
    assignToAgent(data:any){
        return this.httpClient.put(environment.apiUrl + `/Flow/assignToAgent`,data)
    }
    assignToLiaisonAgent(data:any){
        return this.httpClient.put(environment.apiUrl + `/Flow/assignToLiaisonAgent`,data)
    }

    MoveToAgent(data:any){
        return this.httpClient.post(environment.apiUrl + `/Flow/MoveToAgent`,data)
    }
    ChangeAgent(data:any){
        return this.httpClient.post(environment.apiUrl + `/Flow/ChangeAgent`,data)
    }
}
