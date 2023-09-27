import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
    constructor(private  httpClient: HttpClient) { }

    getAll(){
        return this.httpClient.get(environment.apiUrl+'/users/get_permissions')
    }
    add(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/add_permissions',body)
    }
    revoke(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/revoke_permissions_from_role',body)
    }
    addToRole(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/add_permissions_to_role',body)
    }
    delete(id:any){
        return this.httpClient.delete(environment.apiUrl+'/users/delete_permissions?permissionId='+id)
    }
}
