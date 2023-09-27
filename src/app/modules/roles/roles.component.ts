import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {PermissionsService} from 'src/app/shared/Apis/permissions.service';
import {RolesService} from 'src/app/shared/Apis/roles.service';
import {BaseComponent} from "../../shared/base.component";
import {UsersService} from "../../shared/Apis/users.service";

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent implements OnInit {
    itemDialog: boolean = false;

    deleteItemDialog: boolean = false;

    data: any[] = [];

    item: any = {};
    loading: boolean = false

    submitted: boolean = false;
    permissions: any[] = []
    statuses: any[] = [];

    constructor(injector: Injector, private messageService: MessageService, private UsersService: UsersService, private rolesService: RolesService, private permissionsService: PermissionsService) {
        super(injector)
    }

    ngOnInit() {
        this.getData()

    }

    getData() {
        this.loading = true
        this.rolesService.getAll().subscribe((el: any) => {
            this.data = el
            this.permissionsService.getAll().subscribe((el: any) => {
                this.permissions = el
                this.loading = false
            })
        })
    }

    selectPermission(ev: any, role: any) {
        this.loading = true
        if (ev.value.find((el: any) => el.id == ev.itemValue.id)) {
            let form = {
                "permissionIds": [
                    ...role.permissions.map((el: any) => el.id)
                    , ev.itemValue.id
                ],
                "roleId": role.id
            }
            this.permissionsService.addToRole(form).subscribe(el => {
                role.permissions.push(ev.itemValue)
                this.updateToken()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Permission Added Successfully To This Role',
                    life: 3000
                });
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error Adding Permission To This Role',
                    life: 3000
                })
            })
        } else {
            let form = {
                "permissionIds": [
                    ev.itemValue.id
                ],
                "roleId": role.id
            }
            this.permissionsService.revoke(form).subscribe(el => {
                role.permissions = role.permissions.filter((el: any) => el.id != ev.itemValue.id)
                this.updateToken()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Permission Revoked Successfully From This Role ',
                    life: 3000
                });
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error Revoking Permission From This Role',
                    life: 3000
                })
            })
        }
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
        this.rolesService.delete(this.item.id).subscribe(el => {
            this.deleteItemDialog = false;
            this.data = this.data.filter(val => val.id !==this.item.id);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000});
            this.item = {};
            this.loading = false

        }, () => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Role Delete Failed',
                life: 3000
            })
        })
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
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

    saveItem() {
        this.loading = true
        this.submitted = true;
        let form = {
            "roles": [
                this.item.name
            ]
        }
        this.rolesService.addRole(form).subscribe(el => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'item Created',
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
                detail: 'item add Failed',
                life: 3000
            })
        })
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}
