import { Component, Injector } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BaseComponent } from 'src/app/shared/base.component';
import {UsersService} from "../../../shared/Apis/users.service";
import {MainService} from "../../../shared/Apis/main.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            color: var(--primary-color) !important;
            @apply me-[1rem] left-3
        }
    `]
})
export class LoginComponent extends BaseComponent  {
    resetPasswordShow=false
    loading:boolean=false
    OTP:any
    newPassword:any
    password!: string;
    username!:string
    constructor(injector: Injector,public layoutService: LayoutService,
                private UsersService:UsersService,private messageService: MessageService) {super(injector);
    if (this.authService.isAuthenticated()){
        this.utility.router.navigate(['/'])
    }else{
        this.authService.removeToken()
    }
    }
    userId:any
    login(){
        this.loading = true
        this.UsersService.login(this.username,this.password).subscribe((el:any)=>{
            this.loading = false
            this.authService.setToken(el.token)
           this.setPermissions(this.authService.getPermission())
            if (this.authService.isAuthorized(['Dashboard'])){
                this.utility.router.navigate(['/'])
            }else if (this.getMainRoute()){
                this.utility.router.navigate([this.getMainRoute()])
            } else{
                this.utility.router.navigate(['auth','access'])
            }
        },(error)=>{
            if (error.error.message == 'You need to reset your password'){
                this.resetPasswordShow = true
                this.OTP = this.password
                this.userId = Number(error.error.userId)
            }else{
                this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'خطأ في تسجيل الدخول' });
            }
            this.loading = false
        })
    }
    resetPassword(){
        this.loading = true
        this.UsersService.resetUser(this.userId,this.OTP,this.newPassword).subscribe(el=>{
            this.loading = false
            this.resetPasswordShow = false
            this.password = this.newPassword
            this.login()
        },()=>{
            this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشلت إعادة تعيين كلمة المرور' });
            this.loading = false
            this.resetPasswordShow = false
        })
    }


}
