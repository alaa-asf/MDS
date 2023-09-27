import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {BaseComponent} from "../../shared/base.component";
import {DbconnectionsService} from "../../shared/Apis/dbconnections.service";
import {UsersService} from "../../shared/Apis/users.service";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dbconnection',
    templateUrl: './dbconnection.component.html',
    styleUrls: ['./dbconnection.component.scss']
})
export class DbconnectionComponent extends BaseComponent implements OnInit {
    itemDialog: boolean = false;

    deleteItemDialog: boolean = false;

    data: any[] = [];

    item: any = {};
    loading: boolean = false

    submitted: boolean = false;

    statuses: any[] = [];
    users = []

    constructor(injector: Injector, private usersService: UsersService, private messageService: MessageService, private DbconnectionsService: DbconnectionsService) {
        super(injector)
    }

    itemForm = new FormGroup({
        id: new FormControl(),
        url : new FormControl({}, Validators.required),
        databaseName : new FormControl(),
        dataBaseHost : new FormControl(),
        dataBasePort  : new FormControl(),
        username  : new FormControl({}, Validators.required),
        password  : new FormControl({}, Validators.required),
        sshHost : new FormControl(),
        sshPort : new FormControl(),
        sshUsername : new FormControl(),
        sshPassword  : new FormControl(),
        sshEnabled : new FormControl(),
        userId : new FormControl({}, Validators.required),
    })

    get sshEnabled():AbstractControl{
        return this.itemForm.get('sshEnabled') as AbstractControl
    }

    ngOnInit() {
        this.getData()
        this.sshEnabled.valueChanges.subscribe(el=>{
            if (el) {
                this.setValidators('sshHost',Validators.required)
                this.setValidators('sshPassword',Validators.required)
                this.setValidators('sshUsername',Validators.required)
                this.setValidators('sshPort',Validators.required)
                this.setValidators('databaseName',Validators.required)
                this.setValidators('dataBaseHost',Validators.required)
            } else {
                this.clearValidators('sshHost')
                this.clearValidators('sshPassword')
                this.clearValidators('sshUsername')
                this.clearValidators('sshPort')
                this.clearValidators('databaseName')
                this.clearValidators('dataBaseHost')
            }
         })
    }

    setValidators(control:any,validator:any){
        this.itemForm.get(control)?.setValidators(validator)
        this.itemForm.get(control)?.updateValueAndValidity();
        this.itemForm.get(control)?.enable()
    }

    clearValidators(control:any){
        this.itemForm.get(control)?.clearValidators()
        this.itemForm.get(control)?.disable()
        this.itemForm.get(control)?.updateValueAndValidity();
    }

    getData() {
        this.loading = true
        this.DbconnectionsService.getAll().subscribe((el: any) => {
            this.data = el
            this.usersService.getAll().subscribe((el: any) => {
                this.users = el
                this.loading = false
            })
        })
    }

    openNew() {
        this.item = {};
        this.itemForm.reset()
        this.submitted = false;
        this.itemDialog = true;
    }


    editItem(item: any) {
        this.item = {...item}
        this.item.userId = this.item.users.map((el: any) => el.id)
        this.itemForm.patchValue(this.item)
        this.itemDialog = true;
    }

    deleteItem(item: any) {
        this.deleteItemDialog = true;
        this.itemForm.patchValue(item)
    }


    confirmDelete() {
        this.loading = true
        this.DbconnectionsService.delete(this.itemForm.value.id).subscribe(el => {
            this.deleteItemDialog = false;
            this.data = this.data.filter(val => val.id !==this.itemForm.value.id);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Connection Deleted', life: 3000});
            this.item = {};
            this.loading = false

        }, () => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Connection Delete Failed',
                life: 3000
            })
        })
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    getUsers(item: any) {
        return item?.users.map((el: any) => el.username)
    }

    saveItem() {
        let connection:any = {}
        this.submitted = true;
        this.loading = true
        if (this.itemForm.value.id) {
            connection = {...this.itemForm.value}
            connection.connectionId = connection.id
            this.DbconnectionsService.edit(connection).subscribe(el => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Connection Updated',
                    life: 3000
                });
                this.itemDialog = false;
                this.item = {};
                this.itemForm.reset()
                this.loading = false
                this.getData()
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Connection Update Failed',
                    life: 3000
                });
            })
        } else {
            this.DbconnectionsService.add(this.itemForm.value).subscribe(el => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Connection Created',
                    life: 3000
                });
                this.getData()
                this.itemForm.reset()
                this.itemDialog = false;
                this.item = {};
                this.loading = false
            }, () => {
                this.loading = false
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Connection Add Failed',
                    life: 3000
                })
            })
        }
    }


}
