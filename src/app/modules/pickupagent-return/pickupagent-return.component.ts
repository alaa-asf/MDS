import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({
    selector: 'app-pickupagent-return',
    templateUrl: './pickupagent-return.component.html',
    styleUrls: ['./pickupagent-return.component.scss'],
})
export class PickupagentReturnComponent implements OnInit {
    pickupagents: any;
    pickupagent: any;
    constructor(private _returnablesService: ReturnablesService) {}

    ngOnInit() {
        this._returnablesService.getPickupAgent().subscribe((data) => {
            this.pickupagents = data;
            console.log(data);
        });
    }

    getData(filter: any) {}
}
