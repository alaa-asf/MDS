import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MenuService } from './app.menu.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    constructor(public layoutService: LayoutService,public menuService:MenuService) {}

    ngOnInit() {

    }
}
