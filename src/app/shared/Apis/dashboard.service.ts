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
    getLiaisonAgentFilter(comingFromBranch:any,cRcvState:any) {
        return this.httpClient.get(environment.apiUrl + `/users/getLiaisonAgent?comingFromBranch=${comingFromBranch}&cRcvState=${cRcvState}`)
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


    /// branch
    getPcasesChain(filter:any) {
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/getCasesChain`,filter)
    }
    NEWINWAYOP(base:any) {
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/Between/TwoBranchesOp`,base)
    }

    getReturnedCases() {
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/cases/Returned/WithLiaison?branchId=31`)
    }
    ReceiveReturnedWithLiaisonAgent(base:any) {
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/Receive/Returned/WithLiaison`,base)
    }

    RTN_RCVDFROMLIAISON(base:any) {
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/Receive/Returned/WithLiaison`,base)
    }
    getReturnedInStoreWithLiaisonAgent(){
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/cases/ReturnedInStore?toBranch=31`)

    }
    getManifestBranches(){
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/getManifestBranches?branchId=31`)

    }
    ManifestBranchesOp(filter:any){
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/ManifestBranchesOp`,filter)

    }
    getReturnedManifestBranches(){
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/getReturnedManifestBranches?branchId=31`)

    }
    getLiaisonAgentShipmentsBranches(toBranch:any,fromBranchId:any,liaisonAgetnId:any){
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/getLiaisonAgentShipmentsBranches?toBranch=${toBranch}&fromBranchId=${fromBranchId}&liaisonAgetnId=${liaisonAgetnId}`)

    }
    manifestReturnToStoreSingleCases(cases:any){
        return this.httpClient.post(environment.apiUrl + `/BranchesFlow/manifestReturnToStoreSingleCases`,cases)

    }
    getReturnedWithliasionPopUp(returnManifestId:any){
        return this.httpClient.get(environment.apiUrl + `/BranchesFlow/cases/Returned/WithLiaisonPopUp?branchId=31&returnManifestId=${returnManifestId}`)

    }
}
