import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BrancheManagementService {

    constructor(private httpClient: HttpClient) {
    }

    getPathsCosts() {
        return this.httpClient.get(environment.apiUrl + '/branches-management/paths-costs')
    }

    editPath(stateId: any, path: any) {
        return this.httpClient.put(environment.apiUrl + `/branches-management/update-path?stateId=${stateId}`, path)
    }

    getUsersByRank(rank: any){
        return this.httpClient.get(environment.apiUrl + `/branches-management/branch-users?rank=${rank}`)
    }

    editSetupUser(user: any){
        return this.httpClient.put(environment.apiUrl + `/branches-management/update-branch-user` , user)
    }

    deleteSetupUser(id: any){
        return this.httpClient.delete(environment.apiUrl + `/branches-management/delete-branch-user`)
    }
}