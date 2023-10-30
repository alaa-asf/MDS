import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ReturnablesService} from "../../../shared/Apis/returnables.service";
import {IncomeOutcomeService} from "../../../shared/Apis/income-outcome.service";
import {BaseComponent} from "../../../shared/base.component";
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-agent-account',
  templateUrl: './agent-account.component.html',
  styleUrls: ['./agent-account.component.scss']
})
export class AgentAccountComponent extends BaseComponent  implements OnInit{
    constructor(injector: Injector,
                private _returnablesService:ReturnablesService,
                private messageService: MessageService,
                private _IncomeOutcomeService:IncomeOutcomeService) {
        super(injector)
    }
    @ViewChild('table') table: Table | any;

    agents: any;
    agentOrders: any = [];
    agentTransactions:any = []
    note = ''
    checkedAll = false
    showAgentDialog = false
    selectedTab = 0
    haveTransaction = false
    actualReceivedAmtIqd = 0
    actualReceivedAmtUsd = 0
    haveOrder=false
    agent: any;
    agentId: any;
    loading = true
    selectedItems:any=[]
    searchValue:any
    ngOnInit(): void {
        this._returnablesService.getDeliveryAgents().subscribe((data) => {
            this.agents = data;
            this.loading = false
        });
    }
    checkRow(ev:any,item:any,all = false){
        if (all){
            this.selectedItems=[]
            if (ev.checked){
                this.agentOrders.forEach((el:any)=>{
                        el.check = true
                })
                this.selectedItems.push(...this.agentOrders)
                this.checkedAll = true
            }else{
                this.agentOrders.forEach((el:any)=>{
                        el.check = false
                })
                this.selectedItems=[]
                this.checkedAll = false
            }
        }else{
            if (item.check){
                this.agentOrders.forEach((el:any)=>{
                    if (el.caseId == item.caseId){
                        el.check = true
                    }
                })
                this.selectedItems.push(...this.agentOrders.filter((el:any)=>el.caseId == item.caseId))
            }else{
                this.agentOrders.forEach((el:any)=>{
                    if (el.caseId == item.caseId){
                        el.check = false
                    }
                })
                this.selectedItems=[...this.selectedItems.filter((el:any)=>el.caseId != item.caseId )]
            }
        }
        if(this.selectedItems.length == this.agentOrders.length){
            this.checkedAll = true
        }else{
            this.checkedAll = false
        }
    }
    getData(value: any) {
        if (value) {
            this.haveTransaction = false
            this.haveOrder =false
            this.agent = value
            this.agentId = value.userId
        }
    }
    search(){
        let row = this.agentOrders.find((el:any)=>el.deliverReceiptNumber == this.searchValue)
        let found = this.selectedItems.find((el:any)=>el?.deliverReceiptNumber == row?.deliverReceiptNumber)
        this.table.expandedRowKeys[row?.caseId]=true;
        setTimeout(()=>{
            let element:NodeListOf<HTMLElement> = document.querySelectorAll("td:nth-child(6)");
            element.forEach(el=>{
                if (el.textContent == this.searchValue){
                    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" })
                    // @ts-ignore
                    el.parentElement.style.backgroundColor='#f8f9fa'
                    setTimeout(()=>{
                        // @ts-ignore
                        el.parentElement.style.backgroundColor='#fff'
                    },2000)

                }
            })
        },100)

        if (!found){
            this.agentOrders.forEach((el:any)=>{
                if (el.caseId == row.caseId){
                    el.check = true
                }
            })
            this.selectedItems.push(...this.agentOrders.filter((el:any)=>el.caseId == row.caseId))
        }
    }
    getAgentData(){
             if (this.selectedTab ==0){
                this.getAgent()
            }
            if (this.selectedTab ==1){
                this.getTransactions()
            }
     }
    getAgent() {
        this.loading = true
        this.haveOrder = true
        this.selectedItems = []
        this._IncomeOutcomeService
            .getAgentOrders(this.agentId)
            .subscribe((data) => {
                this.agentOrders = data;
                this.loading = false
            });
    }
    changeTab(ev:any){
        this.selectedTab = ev.index
        if ( this.agentId){
            if (ev.index ==0&&!this.haveOrder){
                this.getAgent()
            }
            if (ev.index ==1&&!this.haveTransaction){
                this.getTransactions()
            }
        }


    }
    getTransactions() {
            this.loading = true
            this.haveTransaction = true
            this._IncomeOutcomeService
                .AgentTransactions(this.agentId)
                .subscribe((data) => {
                    this.agentTransactions = data;
                    this.loading = false
                });
        }
    payAgent(){
        let data = {
            'casesIds':this.selectedItems.map((el:any)=>el.caseId),
            "branchId":1,
            "entityId": this.agentId,
            'remark':this.note,
            "totAgentShare": this.selectedalltotalAgentShare,
            "netToBeCollectedFromAgentIqd": this.selectednetAmountOfReceipts,
            "netToBeCollectedFromAgentUsd": this.selectedtotalAmountOfShipmentsUSD,
            "actualReceivedAmtIqd": this.actualReceivedAmtIqd,
            "actualReceivedAmtUsd": this.actualReceivedAmtUsd
        }
        this.loading = true
        this._IncomeOutcomeService.payment(data).subscribe(el=>{
            this.loading = false
            this.close()
            this.getAgent()
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                life: 3000
            });
        },()=>{
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                life: 3000
            });
        })
    }
    close(){
        this.showAgentDialog = false
        this.actualReceivedAmtIqd = 0
        this.actualReceivedAmtUsd = 0
        this.note = ''

    }
    totalReceiptIqd(manifestId:any){
        return this.agentOrders.filter((el:any)=>el.manifestId == manifestId).reduce((total:any, item:any) => item.receiptIqd + total, 0)
    }
    totalAgentShare(manifestId:any){
        return this.agentOrders.filter((el:any)=>el.manifestId == manifestId).reduce((total:any, item:any) => item.totalAgentShare + total, 0)

    }

    get totalAmountOfShipmentsIRQ(){
        return this.agentOrders.reduce((total:any, item:any) => item.receiptIqd + total, 0)
    }
    get totalAmountOfShipmentsUSD(){
        return this.agentOrders.reduce((total:any, item:any) => item.receiptUSD + total, 0)
    }
    get alltotalAgentShare(){
        return this.agentOrders.reduce((total:any, item:any) => item.totalAgentShare + total, 0)
    }
    get netAmountOfReceipts(){
        return this.totalAmountOfShipmentsIRQ - this.alltotalAgentShare
    }

    get selectedtotalAmountOfShipmentsIRQ(){
        return this.selectedItems.reduce((total:any, item:any) => item.receiptIqd + total, 0)
    }
    get selectedtotalAmountOfShipmentsUSD(){
        return this.selectedItems.reduce((total:any, item:any) => item.receiptUSD + total, 0)
    }
    get selectedalltotalAgentShare(){
        return this.selectedItems.reduce((total:any, item:any) => item.totalAgentShare + total, 0)
    }
    get selectednetAmountOfReceipts(){
        return this.selectedtotalAmountOfShipmentsIRQ - this.selectedalltotalAgentShare
    }
}
