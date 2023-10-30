
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReturnablesService {

    constructor(private httpClient: HttpClient) { }


    getPickupAgent() {
        return this.httpClient.get(`${environment.apiUrl}/branch/pickupAgent`);
    }
    getDeliveryAgents() {
        return this.httpClient.get(`${environment.apiUrl}/branch/delivery-agents`);
    }
    getBranchCustomers() {
        return this.httpClient.get(`${environment.apiUrl}/customers/branch-customers`);
    }

    returnToCustomer(agentId: any, id: any) {
        if (id) {
            return this.httpClient.patch(
                `${environment.apiUrl}/PCases/return_to_customer?id=${agentId}&id=${id}`,
                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            );
        } else {
            return this.httpClient.patch(
                `${environment.apiUrl}/PCases/return_to_customer?id=${agentId}`,
                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            );
        }

    }

    getAgentsCases(body: any, id: any) {

        if (id) {
            return this.httpClient.patch(`${environment.apiUrl}/PCases/return_from_agent?id=${body}&id=${id}`,

                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            )
        } else {
            return this.httpClient.patch(`${environment.apiUrl}/PCases/return_from_agent?id=${body}`,

                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            )
        }


    }
    getPickupagentReturn(body: any, id: any) {

        if (id) {
            return this.httpClient.patch(`${environment.apiUrl}/PCases/return_to_pickup_agent?id=${body}&id=${id}`,

                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            )
        } else {
            return this.httpClient.patch(`${environment.apiUrl}/PCases/return_to_pickup_agent?id=${body}`,

                null
                , {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                }
            )
        }


    }
    print(id: any) {
        var docprint: any = window.open("about:blank", "_blank");//new page
        var oTable = document.getElementById(id); //get the 1st row by a selector    
        docprint.document.open();
        docprint.document.write('-', oTable?.innerHTML, '-'); //select the TR's HTML and add it to the new page
        docprint.document.close();
        docprint.print();
        docprint.close();
    }
    deleteSelection(id: number, array: []): void {
        const index = array.findIndex((cId: any) => cId = id);
        if (index > -1) {
            array.splice(index, 1); // Remove ID if already present
        }
    }

    getAgentReturnedCases(agentId: any){
        return this.httpClient.get(`${environment.apiUrl}/api/returns/getAgentReturnedCases?agentId=${agentId}`);
    }
    getAgentReturned(agentId: any){
        return this.httpClient.get(`${environment.apiUrl}/api/returns/getAgentReturnables?agentId=${agentId}`);
    }


}
