import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { MenuService } from '../layout/app.menu.service';
import { UtilityService } from './services/utility.service';
import { AuthService } from "./services/auth.service";
import {permissionsArray, permissionsIndex} from "./constant/states";


export abstract class BaseComponent {
  //#region variables
  utility: UtilityService;
  HttpClient: HttpClient;
  MenuService: MenuService
  authService: AuthService

  //#endregion
  constructor(injector: Injector) {
    this.utility = injector.get(UtilityService);
    this.HttpClient = injector.get(HttpClient);
    this.MenuService = injector.get(MenuService);
    this.authService = injector.get(AuthService);

    this.getRoleFromToken()
  }

    private permission: any =[]

  setPermissions(permission:any) {
      this.permission =permission
      if (permission.length <1){
          this.utility.router.navigate(['auth','access'])
      }else{
          this.MenuService.setMenuVisibility(this.permission)
      }
  }
    getMainRoute(){
        let firstPermission = permissionsArray.find((el:any)=>this.permission.includes('ROLE_'+el.value))
      return firstPermission?.key
    }
  getRoleFromToken() {
      this.permission =this.authService.getPermission()
    this.MenuService.setMenuVisibility(this.permission)
  }

}
