import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {StateService} from "../services/state.service";
import {codeToString} from "../constant/states";

@Injectable({
  providedIn: 'root'
})
export class MainService {

    constructor(private httpClient: HttpClient,private StateService:StateService) {
    }
    getDeliveryAgent() {
        return this.httpClient.get(environment.apiUrl + '/users/getDeliveryAgent').subscribe(el=>{
            const array = Object.entries(el).map(([key, value]) => ({
                value: key,
                label: value
            }));
            this.StateService.deliveryAgents = array
        })
    }
    getReturnReasones() {
        return this.httpClient.get(environment.apiUrl + '/PCases/getReturnReasones').subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el.rtnCode,
                label: el.rtnDesc
            }));
            this.StateService.returnReasones = array
        })
    }
    getPostponedResonse() {
        return this.httpClient.get(environment.apiUrl + '/PCases/getPostponedResonse').subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el.code,
                label: el.description
            }));
            this.StateService.postponedResonse = array
        })
    }

    getLiaisonAgent() {
        return this.httpClient.get(environment.apiUrl + `/users/geALLtLiaisonAgent`).subscribe((el:any)=>{
            const array = el.map((x:any) => ({
                value: x.id,
                label: x.name
            }));
            this.StateService.liaisonAgent = array
        })
    }
    getBranchs() {
        return this.httpClient.get(environment.apiUrl + '/branches').subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el.branchId,
                label: el.branchName
            }));
            this.StateService.branches = array
        })
    }
    getCustomers() {
        return this.httpClient.get(environment.apiUrl + '/customers/branch-customers').subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el.customerName,
                label: el.customerName
            }));
            this.StateService.customers = array
        })
    }

    getAllStateCode() {
        return this.httpClient.get(environment.apiUrl + '/kbstate/get_all_stateCodes').subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el,
                label: codeToString[el]
            }));
            this.StateService.states = array
        })
    }
    getAllDistritCodes(state:any) {
        return this.httpClient.get(environment.apiUrl + '/kbstate/get_all_distritCodes/'+state).subscribe((el:any)=>{
            const array = el.map((el:any) => ({
                value: el.id.toString(),
                label: el.code
            }));
            this.StateService.distrits = array
        })
    }
    getAllDistritCodesrequest(state:any) {
        return this.httpClient.get(environment.apiUrl + '/kbstate/get_all_distritCodes/'+state)
    }
}
