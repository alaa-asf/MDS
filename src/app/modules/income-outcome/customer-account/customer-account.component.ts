import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../shared/base.component";
import {ReturnablesService} from "../../../shared/Apis/returnables.service";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {CustomerAccountService} from "../../../shared/Apis/customer-account.service";
import {StateService} from "../../../shared/services/state.service";

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent extends BaseComponent  implements OnInit{
    constructor(injector: Injector,
                private _returnablesService:ReturnablesService,
                private messageService: MessageService,
                public state: StateService,
                private customerAccountService:CustomerAccountService) {
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
    debtReceivedAmtIqd = 0
    debtReceivedAmtUsd = 0
    haveOrder=false
    agent: any;
    agentId: any;
    loading = false
    selectedItems:any=[]
    searchValue:any
    ngOnInit(): void {

    }
    getstatus(item:any){
        if (item.changedPrice =='N'){
            if (item.agentPmtId){
                return 'تم التسليم حساب مندوب '+item.agentPmtId
            }else{
                return 'تم التسليم'
            }
        }else{
            return  'تم التسليم مع تغيير سعر من ' +item.priceBeforeChange+ ' إلى '+ item.netAmountIQD +', دولار من '+ item.usdPriceBeforeChange +' الى '+ item.netAmountUSD
        }
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
            this.agentId = value.customerId
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
            this.getAgent()
            this.getTransactions()
    }
    getAgent() {
        this.loading = true
        this.haveOrder = true
        this.selectedItems = []
        this.customerAccountService
            .getCustomersOrders(this.agentId)
            .subscribe((data) => {
                this.agentOrders = data;
                this.loading = false
            });
    }
    getTransactions() {
        this.loading = true
        this.haveTransaction = true
        this.customerAccountService
            .getTransactions(this.agentId)
            .subscribe((data) => {
                this.agentTransactions = data;
                this.loading = false
            });
    }
    payAgent(){
        let data = {
            'casesIds':this.selectedItems.map((el:any)=>el.caseId),
            "branchId":1,
            "customerId":this.agent.customerId,
            "customerName":this.agent.customerName,

            'remark':this.note,
            "rmk": this.note,
            "entityId": this.agentId,
            "totAgentShare":this.selectedtotalAmountIRQ,
            "totalReceiptsAmtFormUsd": this.selectedtotalAmountUSD,
            "totalReceiptsAmtFormIqd": this.selectedtotalAmountIRQ,
            "totalnet_iqd": this.selectednetAmountOfReceiptsIRQ,
            "totalnet_usd": this.selectednetAmountOfReceiptsUSD
        }
        this.loading = true
        this.customerAccountService.payment(data).subscribe(el=>{
            this.loading = false
            this.close()
            this.getAgent()
            this.getTransactions()
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
        this.debtReceivedAmtIqd = 0
        this.debtReceivedAmtUsd = 0
        this.note = ''

    }
    openDialog(){
        this.showAgentDialog = true
        this.debtReceivedAmtIqd = this.transCreditIqd
        this.debtReceivedAmtUsd = this.transCreditUsd

    }
    currentReceiptPriceUSD(key:any){
        return this.agentOrders.filter((el:any)=>el.createdDateOnly == key).reduce((total:any, item:any) => item.currentReceiptPriceUSD + total, 0)
    }
    currentReceiptPrice(key:any){
        return this.agentOrders.filter((el:any)=>el.createdDateOnly == key).reduce((total:any, item:any) => item.currentReceiptPrice + total, 0)
    }
    shipmentCost(key:any){
        return this.agentOrders.filter((el:any)=>el.createdDateOnly == key).reduce((total:any, item:any) => item.shipmentCost + total, 0)
    }
    netAmountIQD(key:any){
        return this.agentOrders.filter((el:any)=>el.createdDateOnly == key).reduce((total:any, item:any) => item.netAmountIQD + total, 0)
    }
    netAmountUSD(key:any){
        return this.agentOrders.filter((el:any)=>el.createdDateOnly == key).reduce((total:any, item:any) => item.netAmountUSD + total, 0)
    }

    get currentReceiptPriceTotal(){
        return this.agentOrders.reduce((total:any, item:any) => item.currentReceiptPrice + total, 0)||0
    }
    get currentReceiptPriceUSDTotal(){
        return this.agentOrders.reduce((total:any, item:any) => item.currentReceiptPriceUSD + total, 0)||0
    }
    get netAmountIQDTotal(){
        return this.agentOrders.reduce((total:any, item:any) => item.netAmountIQD + total, 0)||0
    }
    get netAmountUSDTotal(){
        return this.agentOrders.reduce((total:any, item:any) => item.netAmountUSD + total, 0)||0
    }
    get transCreditIqd(){
        return this.agentTransactions.reduce((total:any, item:any) => item.transCreditIqd + total, 0)||0
    }
    get transCreditUsd(){
        return this.agentTransactions.reduce((total:any, item:any) => item.transCreditUsd + total, 0)||0
    }
    get selectedtotalAmountIRQ(){
        return this.selectedItems.reduce((total:any, item:any) => item.netAmountIQD + total, 0) ||0
    }
    get selectedtotalAmountUSD(){
        return this.selectedItems.reduce((total:any, item:any) => item.netAmountUSD + total, 0)||0
    }

    get selectednetAmountOfReceiptsIRQ(){
        return this.selectedtotalAmountIRQ - this.debtReceivedAmtIqd
    }
    get selectednetAmountOfReceiptsUSD(){
        return this.selectedtotalAmountUSD - this.debtReceivedAmtUsd
    }
}

