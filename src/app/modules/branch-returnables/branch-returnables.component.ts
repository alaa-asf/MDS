import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({
    selector: 'app-branch-returnables',
    templateUrl: './branch-returnables.component.html',
    styleUrls: ['./branch-returnables.component.scss'],
})
export class BranchReturnablesComponent implements OnInit {
    products: any = [];

    constructor(private _returnablesService: ReturnablesService) {}

    ngOnInit() {
        // this._returnablesService.getPickupAgent().subscribe((data) => {
        //     console.log(data);
        // });
    }

    // getData(filter: any) {}
}
