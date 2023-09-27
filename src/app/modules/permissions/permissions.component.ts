import {Component, Injector, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import { PermissionsService } from 'src/app/shared/Apis/permissions.service';
import {BaseComponent} from "../../shared/base.component";

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent extends BaseComponent implements OnInit {
    itemDialog: boolean = false;

    deleteItemDialog: boolean = false;

    data: any[] = [];

    item: any = {};
    loading: boolean = false

    submitted: boolean = false;
    statuses: any[] = [];

    constructor(injector: Injector,private messageService: MessageService,private permissionsService:PermissionsService) { super(injector)}

    ngOnInit() {
        this.getData()

    }
    getData() {
        this.loading = true
        this.permissionsService.getAll().subscribe((el: any) => {
            this.data = el
            this.loading = false
        })
    }
    openNew() {
        this.item = {};
        this.submitted = false;
        this.itemDialog = true;
    }


    editItem(item: any) {
        this.item = { ...item };
        this.itemDialog = true;
    }

    deleteItem(item: any) {
        this.deleteItemDialog = true;
        this.item = item
    }


    confirmDelete() {
        this.loading = true
        this.permissionsService.delete(this.item.id).subscribe(el => {
            this.deleteItemDialog = false;
            this.data = this.data.filter(val => val.id !==this.item.id);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Permission Deleted', life: 3000});
            this.item = {};
            this.loading = false

        }, () => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Permission Delete Failed',
                life: 3000
            })
        })
    }

    hideDialog() {
        this.itemDialog = false;
        this.submitted = false;
    }

    saveItem() {
        this.loading = true
        this.submitted = true;
        let form = {
            "permissions": [
                this.item.name
            ]
          }
        this.permissionsService.add(form).subscribe(el => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Permission Created',
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
                detail: 'Permission Add Failed',
                life: 3000
            })
        })
    }



}
