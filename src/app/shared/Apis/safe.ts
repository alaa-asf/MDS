import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class Safe {
    constructor(private httpClient: HttpClient) {}
    safe = 'safe';
    getAllSafe() {
        return this.httpClient.get(environment.apiUrl+'/safe/index')
    }
    getAllacctbox() {
        return this.httpClient.get(environment.apiUrl+'/accountantboxes/accountant-boxes-by-branch')
    }
}
