import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private  httpClient: HttpClient) { }

    login(username:string,password:string){
      return this.httpClient.post(environment.apiUrl+'/users/log_in',{  "username": username, "password": password})
    }
    refresh(){
        return this.httpClient.post(environment.apiUrl+'/users/refresh',null)
    }
    getAll(){
        return this.httpClient.get(environment.apiUrl+'/users/get_users')
    }
    register(body:any){
        return this.httpClient.post(environment.apiUrl+'/users/register',body)
    }
    enable(id:any){
        return this.httpClient.post(environment.apiUrl+'/users/enable_user?userId='+id,null)
    }
    disable(id:any){
        return this.httpClient.post(environment.apiUrl+'/users/disable_user?userId='+id,null)
    }
    reset(id:any,OTP:any){
        return this.httpClient.post(environment.apiUrl+'/users/setRestPassword', {userId:id,newPassword:OTP})
    }
    resetUser(id:any,OTP:any,newPassword:any){
        return this.httpClient.post(environment.apiUrl+'/users//ResetPassword', {userId:id,oldPassword:OTP,newPassword:newPassword})
    }
    delete(id:any){
        return this.httpClient.delete(environment.apiUrl+'/users/delete_user?userId='+id)
    }
    getٌRoles() {
        return this.httpClient.get(environment.apiUrl+'/users/get_roles')
    }
}
