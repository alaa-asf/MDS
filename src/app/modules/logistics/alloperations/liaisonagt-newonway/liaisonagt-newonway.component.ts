import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from "../../../../shared/base.component";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../../../shared/Apis/dashboard.service";
import { StateService } from "../../../../shared/services/state.service";
import { stage, step, stepId } from "../../../../shared/constant/stage";
import { MainService } from "../../../../shared/Apis/main.service";

@Component({
  selector: 'app-liaisonagt-newonway',
  templateUrl: './liaisonagt-newonway.component.html',
  styleUrls: ['./liaisonagt-newonway.component.scss']
})
export class LIAISONAGTNEWONWAYComponent extends BaseComponent implements OnInit {
    stage: any
    step: any
    stepEnum = step
    stageEnum = stage

    data: any[] = []
    states: any = []
    districts: any = []
    totalRecords = 0
    stepDialogVisible = false
    loading: boolean = false
    decisionId: any
    optionForAction: any = {}
    filters: any = {
        c_dlvagent_manifestid: null,//منفيست مندوب التوصيل
        c_id: null,//كود الشحنه
        customerReceipt: null,//رقم الوصلF
        merchantName: null,//المتجر
        from: null,//بتاريخ
        to: null,//إلى تاريخ
        stateNameArabic: null,//المحافظة
        agentName: null,//مندوب التوصيل
        c_rcv_hp1: null,//هاتف المستلم
        c_createddt: null,//تاريخ الشحنه
        cRcvDistrict: null,//المنطقة
        cc_liaisonagentid: null,//مندوب ألأرتباط
        qManifestId: null,//رقم المنفيست
        cc_tobranch: null,//قادمة من فرع
        cc_rtnmanifestid: null,//رقم المنفيست الارجاع
        cc_frombranch: null,//إلى فرع
        barcode_checker: null,//باركود
        step: '',
        stage: ''
    }
    columns: any = []
    filterDisplay = {
        c_dlvagent_manifestid: true,
        c_id: true,
        customerReceipt: true,
        merchantName: true,
        from: true,
        to: true,
        stateNameArabic: true,
        agentName: true,
        c_rcv_hp1: true,
        c_createddt: true,
        cRcvDistrict: true,
        cc_liaisonagentid: true,
        qManifestId: true,
        cc_tobranch: true,
        cc_rtnmanifestid: true,
        cc_frombranch: true,
        barcode_checker: false
    }
    operation: any = []
    constructor(injector: Injector, private route: ActivatedRoute,
                public state: StateService,
                private mainService: MainService,
                public  dashboardService: DashboardService) {
        super(injector)
        this.stage = this.route.snapshot.url[0].path;
        this.step = this.route.snapshot.url[1].path;
    }
    changeState(ev: any) {
        this.mainService.getAllDistritCodes(ev.value)
    }

    ngOnInit() {
        this.dashboardService.getDecisionsByStep(stepId[this.step]).subscribe((des: any) => {
            this.operation = des.map((obj: any) => ({
                value: obj.actionCode,
                label: obj.description
            }));

            this.optionForAction = {
                'RECEIVEDFROMLIAISON': [
                    {
                        type: 'dropdown',
                        key: 'districtsMap',
                        options: [],
                        placeholder: 'المنطقة',
                        selected: null
                    },
                    {
                        type: 'dropdown',
                        key:'dlvAgentMap',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب التوصيل',
                        selected: null
                    }

                ],
                "RCV_DIRECT_ASSIGNAGENT": [
                    {
                        type: 'dropdown',
                        key: 'districtsMap',
                        options: [],
                        placeholder: 'المنطقة',
                        selected: null
                    },
                    {
                        type: 'dropdown',
                        key:'dlvAgentMap',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب التوصيل',
                        selected: null
                    }
                ],
            }
        })

        this.setFilters()
        this.setData()
        this.getData()
    }
    save() {
            let updatedCases = this.data.filter(el => el.decision)
            let casesIds = updatedCases.map(el => el.ccId)
            let actionsMap: any = {}

            updatedCases.forEach((obj: any) => {
                actionsMap[obj.ccId] = obj.decision;
            });
            let otherData: any = {
                "districtsMap": {},
                "dlvAgentMap": {}
            }

            updatedCases.forEach((obj: any) => {
                if (obj.optionForAction) {
                    obj.optionForAction.forEach((opt: any) => {
                            otherData[opt.key][obj.ccId] = opt.selected
                    });
                }
            });

            let base = {
                "stepCode": this.step,
                "stage":this.stage,
                "casesIds": casesIds,
                "casesToRmkMap": {},
                ...otherData,
                "actionsMap": actionsMap
            }
            this.loading = true
            this.dashboardService.NEWINWAYOP(base).subscribe(res => {
                this.loading = false
                this.getData()
            }, () => {
                this.loading = false
            })
    }

    changeDecision(data: any, ev: any) {
            this.loading = true
            this.mainService.getAllDistritCodesrequest(data.rcvState).subscribe((el:any)=>{
                this.loading = false
                data.optionForAction = JSON.parse(JSON.stringify(this.optionForAction[ev.value]));
                const array = el.map((x:any) => ({
                    value: x.id.toString(),
                    label: x.code
                }));
                data.optionForAction[0].options = array
            })
    }

    resetFilter() {
        this.setFilters()
        this.getData()
    }

    getData() {
        this.loading = true
        const filter = Object.keys(this.filters)
            .filter((key) => ['step', 'stage','cRcvDistrict', 'customerReceipt','c_createddt','qManifestId', 'merchantName', 'from', 'to', 'stateNameArabic', 'agentName', 'c_rcv_hp1', 'branchCode'].includes(key))
            .reduce((obj: any, key: any) => {
                return Object.assign(obj, {
                    [key]: this.filters[key]
                });
            }, {});
            this.dashboardService.getPcasesChain().subscribe((res: any) => {
                this.data = res
                this.loading = false
            },()=>{
                this.loading = false
            })

    }

    setFilters() {
        this.filters = {
            c_dlvagent_manifestid: null,//منفيست مندوب التوصيل
            c_id: null,//كود الشحنه
            customerReceipt: null,//رقم الوصل
            merchantName: null,//المتجر
            from: null,//بتاريخ
            to: null,//إلى تاريخ
            stateNameArabic: null,//المحافظة
            agentName: null,//مندوب التوصيل
            c_rcv_hp1: null,//هاتف المستلم
            c_createddt: null,//تاريخ الشحنه
            cRcvDistrict: null,//المنطقة
            cc_liaisonagentid: null,//مندوب ألأرتباط
            qManifestId: null,//رقم المنفيست
            cc_tobranch: null,//قادمة من فرع
            cc_rtnmanifestid: null,//رقم المنفيست الارجاع
            cc_frombranch: null,//إلى فرع
            barcode_checker: null,//باركود
            step: this.step,
            stage: this.stage
        }
    }

    setData() {
        return this.LIAISONAGT_NEWONWAY();
    }
    LIAISONAGT_NEWONWAY() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: false,
            merchantName: false,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: false,
            cRcvDistrict: true,
            cc_liaisonagentid: true,
            qManifestId: true,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'customerName'
            },
            {
                name: 'رقم الوصل',
                type: 'string',
                key: 'cCustreceiptnoori'
            },
            {
                name: 'أنشأ في فرع',
                type: 'string',
                key: 'branchName'
            },
            {
                name: 'مبلغ الوصل د.ع',
                type: 'string',
                key: 'receiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'receiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'createdDate'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }



}
