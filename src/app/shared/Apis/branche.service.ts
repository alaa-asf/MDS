import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BrancheService {

    constructor(private httpClient: HttpClient) {
    }

    getBranchesByUserId() {
        return this.httpClient.get(environment.apiUrl + '/branches-management/getBranchForUser?userId=1')
    }
}
