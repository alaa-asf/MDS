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
    getDecisionsByStep(step:any) {
        return this.httpClient.get(environment.apiUrl + `/PCases/getDecisionsByStep?stepId=${step}`)
    }
    addNewCase(shipment:any){
        return this.httpClient.post(environment.apiUrl + `/PCases`,shipment)
    }
}
