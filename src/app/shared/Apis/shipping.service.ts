import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShippingService {

    constructor(private httpClient: HttpClient) {
    }

    get_all_distritCodes(stateCode: any) {
        return this.httpClient.get(environment.apiUrl + `/kbstate/get_all_distritCodes/${stateCode}`)
    }

    getStoresByStatuscode(stateCode: any) {
        return this.httpClient.get(environment.apiUrl + `/customers/branch-customers-by-state?stateCode=${stateCode}`)
        // return this.httpClient.get(environment.apiUrl + `/customers/branch-customers-by-state?branchId=${branchId}&stateCode=${stateCode}`)
    }

    addShippingGovernorate(shipping: any){
        return this.httpClient.post(environment.apiUrl + `/PCases/createCase` , shipping)
    }

    addManyShipping(shippingList: any){
        let shippingListRequest;
        shippingList.forEach((element: any) => {
            shippingListRequest.push(this.httpClient.post(environment.apiUrl + `/PCases/createCase` , element))
        });
        forkJoin(shippingListRequest).subscribe(res => {
            // console.log(res);
            
        })
    }
}
