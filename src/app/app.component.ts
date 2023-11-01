import { Component, Injector, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BaseComponent } from './shared/base.component';
import {MainService} from "./shared/Apis/main.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit {

    constructor(injector: Injector,private primengConfig: PrimeNGConfig,private MainService:MainService)
    {super(injector)};

    ngOnInit() {
        this.MainService.getDeliveryAgent()
        this.MainService.getReturnReasones()
        this.MainService.getPostponedResonse()
        this.MainService.getBranchs()
        this.MainService.getAllStateCode()
        this.MainService.getCustomers()
        this.primengConfig.ripple = true;
    }
}
