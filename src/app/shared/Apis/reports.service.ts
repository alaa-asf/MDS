import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
    constructor(private  httpClient: HttpClient) { }
    getAll(filter:any){
        return this.httpClient.post(environment.apiUrl+'/multi/get_all_data',filter)
    }
    getCustomersData(filter:any){
        return this.httpClient.post(environment.apiUrl+'/multi/get_customers_data',filter)
    }
    getMerchantData(filter:any){
        return this.httpClient.post(environment.apiUrl+'/multi/get_merchant_data',filter)
    }
    getDelieverdAndCanceledOrders(filter:any){
        return this.httpClient.post(environment.apiUrl+'/multi/get_stages_steps',filter)
    }
    getCustomerRecepitamt(filter:any){
        return this.httpClient.post(environment.apiUrl+'/multi/get_c_recepitamt',filter)
    }
    getAllStateCodes(){
        return this.httpClient.get(environment.apiUrl+'/multi/get_all_stateCodes')
    }
    getAllDistritCodes(district:any){
        return this.httpClient.get(environment.apiUrl+'/multi/get_all_distritCodes/'+district)
    }
 }
