import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BrancheManagementService } from 'src/app/shared/Apis/branches-management.service';

@Component({
  selector: 'app-setup-state',
  templateUrl: './setup-state.component.html',
  styleUrls: ['./setup-state.component.scss'],
  providers:[MessageService]
})
export class SetupStateComponent implements OnInit {
  pathsCosts = [];
  path: any;
  pathDetail = {
    stateNameArabic: "يغداد بغداد",
    stateNameEnglish: "baghdad",
    stateCode: "BGD",
    isActive: "Yes",
    stateOrder: 2,
    stateCharges: 10000,
    stateChargesRural: 12000,
    agentShare: 4000,
    agentShareRural: 5000
  }
  showDialog: boolean = false;
  cases = [
    { name: 'YES', value: 'Y' },
    { name: 'NO', value: 'N' },
  ];
  case: any = { name: 'YES', value: 'Y' };
  stateId: any;
  constructor(private _BrancheService: BrancheManagementService , private messageService: MessageService) { }

  ngOnInit() {
    this.getPathsCosts();
  }

  getPathsCosts() {
    this._BrancheService.getPathsCosts().subscribe((res: any) => {
      this.pathsCosts = res;
    })
  }

  editPath(stateId: any) {
    this.showDialog = true;
    this.pathsCosts.forEach((element: any) => {
      if (element.stateId == stateId) this.path = element;
    });
    this.pathDetail.stateNameArabic = this.path.stateNameArabic;
    this.pathDetail.stateNameEnglish = this.path.stateNameEnglish;
    this.pathDetail.stateCode = this.path.stateCode;
    this.pathDetail.stateOrder = this.path.stateOrder;
    this.pathDetail.stateCharges = this.path.charges;
    this.pathDetail.stateChargesRural = this.path.chargesRural;
    this.pathDetail.agentShare = this.path.agentShare;
    this.pathDetail.agentShareRural = this.path.agentShareRural;
    this.pathDetail.isActive = this.case.value;
    this.case.value = this.path.stateActive;
    this.stateId = this.path.stateId;
  }

  confirmEditPath() {

    this._BrancheService.editPath(this.stateId, this.pathDetail).subscribe((res: any) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'تمت عملية التعديل',
    });
      this.getPathsCosts();
      this.showDialog = false;
    })
  }

  getStateActive(caseValue: any) {
    this.case = caseValue;
    if (this.case.name == 'YES') this.pathDetail.isActive = 'Y';
    else if (this.case.name == 'NO') this.pathDetail.isActive = 'N';
  }

}
