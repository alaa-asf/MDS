import {ChangeDetectorRef, Component, Injector, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../shared/base.component";
import {UsersService} from "../../shared/Apis/users.service";
import {RolesService} from 'src/app/shared/Apis/roles.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
    itemDialog: boolean = false;

    deleteItemDialog: boolean = false;
    resetPasswordShow = false
    OTP: any
    data: any[] = [];
    selectedUser: any
    item: any = {};

    submitted: boolean = false;
    roles = []
    statuses: any[] = [];
    loading: boolean = false

    constructor(injector: Injector,private clipboard: Clipboard, private messageService: MessageService, private cdr: ChangeDetectorRef, private UsersService: UsersService, private rolesService: RolesService) {
        super(injector)
    }

    ngOnInit() {
        this.getData()

    }

    getData() {
        this.loading = true
        this.UsersService.getAll().subscribe((user: any) => {
            this.data = user
            this.data.forEach(el => {
                    el.roles = el.roles.map((el: any) => ({name: el.name, id: el.id}))
                }
            )
            this.rolesService.getAll().subscribe((roles: any) => {
                this.roles = roles
                this.loading = false
            })
        })
    }

    get rolesPlain() {
        return this.roles.map((el: any) => ({name: el.name, id: el.id}))
    }

    selectRoles(ev: any, user: any) {
        this.loading = true
        let form = {
            "userId": user.id,
            "roleId": ev.itemValue.id
        }
        if (ev.value.find((el: any) => el.id == ev.itemValue.id)) {
            this.rolesService.assignRole(form).subscribe(el => {
                this.updateToken()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Role Added Successfully To This User',
                    life: 3000
                });
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error Adding Role To This User',
                    life: 3000
                })
            })
        } else {

            this.rolesService.revokeRole(form).subscribe(el => {
                this.updateToken()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Role Revoked Successfully From This User',
                    life: 3000
                });
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error Revoking Role From This User',
                    life: 3000
                })
            })
        }
    }

    getRoles(item: any) {
        return item?.roles.map((el: any) => el.name)
    }

    updateToken() {
        this.UsersService.refresh().subscribe((el: any) => {
            this.loading = false
            this.authService.setToken(el.token)
            this.setPermissions(this.authService.getPermission())
        }, () => {
            this.loading = false
            this.utility.logout()
        })
    }

    openNew() {
        this.item = {};
        this.submitted = false;
        this.itemDialog = true;
    }


    editItem(item: any) {
        this.item = {...item};
        this.itemDialog = true;
    }
    deleteItem(item: any) {
        this.deleteItemDialog = true;
        this.item = item
    }


    confirmDelete() {
        this.loading = true
        this.UsersService.delete(this.item.id).subscribe(el => {
            this.deleteItemDialog = false;
            this.data = this.data.filter(val => val.id !==this.item.id);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
            this.item = {};
            this.loading = false

        }, () => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User Delete Failed',
                life: 3000
            })
        })
    }

    changeUserStatus(ev: any, item: any) {
        this.loading = true
        if (ev.checked) {
            this.UsersService.enable(item.id).subscribe(el => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Enabled Successfully',
                    life: 3000
                });
                this.updateToken()
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Enable User Failed',
                    life: 3000
                })
            })
        } else {
            this.UsersService.disable(item.id).subscribe(el => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Disabled Successfully',
                    life: 3000
                });
                this.updateToken()
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Disable User Failed',
                    life: 3000
                })
            })
        }
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    saveItem() {
        this.submitted = true;
        this.loading = true
        this.UsersService.register(this.item).subscribe(el => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'New User Created Successfully',
                life: 3000
            });
            this.getData()
            this.itemDialog = false;
            this.item = {};
            this.loading = false
        }, () => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed Adding New User',
                life: 3000
            })
        })
    }
    resetUserPassword(user:any){
        this.resetPasswordShow = true
        this.selectedUser = user
        this.OTP = this.generateOTP()
        this.showMessage = false
        this.copyOTPShow=false
    }
    resetUserPasswordHide(){
        this.resetPasswordShow = false
        this.selectedUser = null
        this.showMessage = false
        this.copyOTPShow=false
    }
    resetLoading = false
    showMessage = false
    copyOTPShow =false
    resetPassword() {
        this.resetLoading =true
        this.UsersService.reset(this.selectedUser.id,this.OTP).subscribe(el=>{
            this.resetLoading = false
            this.showMessage = true
        },()=>{
            this.resetLoading = false
            this.showMessage = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Reset password failed',
                life: 3000
            })
        })
    }
    copyOTP() {
        this.clipboard.copy(this.OTP);
        this.copyOTPShow=true
    }
    generateOTP() {
        // Define allowed characters for the OTP
        const chars = '1qa0z3w7sx4ed9cr64fvt6gb6yh5nu8jmi1ko6lp';
        // Define OTP length
        const OTPLength = 10;
        let OTP = '';
        // Loop through OTP length and add random characters to the OTP
        for (let i = 0; i < OTPLength; i++) {
            OTP += chars[Math.floor(Math.random() * chars.length)];
        }
        // Return the generated OTP
        return OTP;
    }
}
