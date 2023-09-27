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
        return this.httpClient.get(environment.apiUrl + '/users/getReturnReasones').subscribe(el=>{
            const array = Object.entries(el).map(([key, value]) => ({
                value: value,
                label: key
            }));
            this.StateService.returnReasones = array
        })
    }
    getLiaisonAgent() {
        return this.httpClient.get(environment.apiUrl + '/users/getLiaisonAgent').subscribe(el=>{
            const array = Object.entries(el).map(([key, value]) => ({
                value: value,
                label: key
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
                value: el,
                label: codeToString[el]
            }));
            this.StateService.distrits = array
        })
    }
}
