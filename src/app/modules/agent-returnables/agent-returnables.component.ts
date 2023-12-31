import { Component, OnInit } from '@angular/core';
import { ReturnablesService } from 'src/app/shared/Apis/returnables.service';

@Component({

  selector: 'app-agent-returnables',
  templateUrl: './agent-returnables.component.html',
  styleUrls: ['./agent-returnables.component.scss'],
})
export class AgentReturnablesComponent implements OnInit {
  manifestiddates: any = [];
  agentData: any = [];
  agent: any;
  agentId: any;
  agentCheckbox: boolean = false;
  disabled: boolean = true;
  agents: any;
  selectedIds: any = [];
  showInfo: boolean = false;
  constructor(private _returnablesService: ReturnablesService) { }

  ngOnInit() {
    this._returnablesService.getDeliveryAgents().subscribe((data) => {
      this.agents = data;  
    });
  }

  getAgent(agentId: any, id: any) {
    this._returnablesService
      .getAgentsCases(agentId, id)
      .subscribe((data) => {
        this.manifestiddates = data;
        this.agentCheckbox = false
      });
  }
  print(id: any) {
    this._returnablesService.print(id)

  }
  getData(value: any) {
    if (value) {
      this.agentId = value.userId
      this.disabled = false
    }
  }
  getAgentCheckbox() {
 

    if (this.agentCheckbox && this.agentId) {

      this.getAgent(this.agentId, this.agent)

    } else if (this.agentId) {


      this.getAgent(this.agentId, null)

    }
  }
  deleteSelection(id: number): void {
    this._returnablesService.deleteSelection(id, this.manifestiddates)
  }

  getAgentReturnedCases(id: any){
    this._returnablesService.getAgentReturnedCases(id).subscribe((res: any) => {
      this.manifestiddates = res;
    })
    this.getAgentReturned(id);
  }

  getAgentReturned(id: any){
    this._returnablesService.getAgentReturned(id).subscribe((res: any) => {
      this.agentData = this.groupObjects(res);
    })
  }

  groupObjects(objects: any[]): any[] {
    const groupedObjects: any = [];
    objects.forEach(obj => {
      const isDuplicate = groupedObjects.some((groupedObj: any) =>
        groupedObj.createdDate === obj.createdDate && groupedObj.aprCreatedBy === obj.aprCreatedBy
      );
      if (!isDuplicate) {
        groupedObjects.push(obj);
      }
    });
    return groupedObjects;
  }
}
