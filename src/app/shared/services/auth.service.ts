import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { UtilityService } from './utility.service';

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {}
    public setToken(token: string) {
        localStorage.setItem('token', token);
        // console.log(token);
    }

    public removeToken() {
        localStorage.removeItem('token');
    }

    public getRole() {
        const token = this.getToken();
        if (token) {
            const tokenPayload: any = decode(token);
            return tokenPayload.sub;
        }
    }
    public getPermission() {
        const token = this.getToken();
        if (token) {
            const tokenPayload: any = decode(token);
            return tokenPayload.authorities.map((el: any) => el.authority);
        }
    }
    public getToken() {
        const token = localStorage.getItem('token') || '';
        return token;
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    public isAuthorized(roles: string[]): boolean {
        const token = localStorage.getItem('token') || '';
        const tokenPayload: any = decode(token);
        let permission = tokenPayload.authorities.map(
            (el: any) => el.authority
        );
        let havePermission = permission?.some((per: any) =>
            roles.includes(per.replace(/^ROLE_/, ''))
        );
        return this.isAuthenticated() && havePermission;
    }

    public menuVisibility() {}
}
