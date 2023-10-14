import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({
    selector: 'app-agent-returnables',
    templateUrl: './agent-returnables.component.html',
    styleUrls: ['./agent-returnables.component.scss'],
})
export class AgentReturnablesComponent implements OnInit {
    manifestiddates: any = [];
    agent: any;
    agents: any;
    selectedIds:any = [];
    constructor(private _returnablesService: ReturnablesService) {}

    ngOnInit() {
        this._returnablesService.getDeliveryAgents().subscribe((data) => {
            this.agents = data;
            console.log(data);
        });
    }

    getAgent(agentId: any) {
        this._returnablesService
            .getAgentsCases(agentId)
            .subscribe((data) => {
              this.manifestiddates = data;
            });
    }

    getData(value: any) {
        this.getAgent(value.userId);
    }

    toggleSelection(id: number): void {
      console.log(id);
      
      console.log(this.selectedIds);
      
      const index = this.selectedIds.indexOf(id);
      if (index > -1) {
        this.selectedIds.splice(index, 1); // Remove ID if already present
      } else {
        this.selectedIds.push(id); // Add ID if not already present
      }
    }
}
