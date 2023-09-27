import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    public router: Router;

    constructor(injector: Injector, private authService: AuthService) {
        this.router = injector.get(Router);
    }

    logout() {
        this.authService.removeToken()
        //this.router.navigate(['/auth','login'])
    }

    convertDate(date: Date): any {
        let dd = String(date.getDate()).padStart(2, '0'); // day
        let mm = String(date.getMonth() + 1).padStart(2, '0'); // month (January is 0)
        let yyyy = date.getFullYear(); // year

        return yyyy + '-' + mm + '-' + dd;
    }
     formatMoney(num:number) {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'K';
        } else {
          return num.toString();
        }
      }

     interpolateColor(color1:any, color2:any, factor:any) {
        // Convert the colors to RGB values
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);

        // Interpolate the RGB values
        const r = Math.round(c1.r + factor * (c2.r - c1.r));
        const g = Math.round(c1.g + factor * (c2.g - c1.g));
        const b = Math.round(c1.b + factor * (c2.b - c1.b));

        // Convert the interpolated RGB values back to a hex color code
        return this.rgbToHex(r, g, b);
    }

     hexToRgb(hex:any) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

     rgbToHex(r:any, g:any, b:any) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

     componentToHex(c:any) {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
}
