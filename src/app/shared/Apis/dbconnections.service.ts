import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DbconnectionsService {
    constructor(private  httpClient: HttpClient) { }

    getAll(){
        return this.httpClient.get(environment.apiUrl+'/connection_params/get_connection_params')
    }
    add(body:any){
        return this.httpClient.post(environment.apiUrl+'/connection_params/add_connection_params',body)
    }
    delete(id:any){
        return this.httpClient.delete(environment.apiUrl+'/connection_params/delete_connection_params?connection_id='+id)
    }
    edit(body:any){
        return this.httpClient.post(environment.apiUrl+'/connection_params/edit_connection_params',body)
    }
}
