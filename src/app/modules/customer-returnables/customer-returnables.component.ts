import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({
    selector: 'app-customer-returnables',
    templateUrl: './customer-returnables.component.html',
    styleUrls: ['./customer-returnables.component.scss'],
})
export class CustomerReturnablesComponent implements OnInit {
    products: any = [];
    customer: any;
    customers: any;
    agentId: any;
    agent: any;
    agentCheckbox: boolean = false;
    disabled: boolean = true;
    constructor(private _returnablesService: ReturnablesService) { }

    ngOnInit() {
        this._returnablesService.getBranchCustomers().subscribe((data) => {
            this.customers = data;
        });
    }

    getUserId(value: any) {       
        console.log(value);
         
        if (value) {
          this.agentId = value.customerId
          this.disabled = false
        }
      }
    getAgent(agentId: any, id: any) {
        this._returnablesService
            .returnToCustomer(agentId, id)
            .subscribe((data) => {
                this.products = data;
                this.agentCheckbox = false
            });
    }
    getAgentCheckbox() {
        if (this.agentCheckbox && this.agentId) {

            this.getAgent(this.agentId, this.agent)
      
          } else if (this.agentId) {
      
      
            this.getAgent(this.agentId, null)
      
          }
      }
    deleteSelection(id: number): void {
        this._returnablesService.deleteSelection(id, this.products)
    }
    print(id: any) {
        this._returnablesService.print(id)

    }
    // getData() {
    //     this._returnablesService.returnToCustomer(6566, 6564).subscribe((data) => {
    //         console.log(data);

    //     });
    // }
}
