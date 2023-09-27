import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    constructor(private  httpClient: HttpClient) { }

    getAll(){
        return this.httpClient.get(environment.apiUrl+'/users/get_roles')
    }
    assignRole(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/assign_role',body)
    }
    addRole(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/add_roles',body)
    }
    revokeRole(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/revoke_role',body)
    }
    delete(id:any){
        return this.httpClient.delete(environment.apiUrl+'/users/delete_roles?roleId='+id)
    }
}
