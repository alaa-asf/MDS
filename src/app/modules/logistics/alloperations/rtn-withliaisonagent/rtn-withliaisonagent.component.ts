import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base.component";
import {ActivatedRoute} from "@angular/router";
import {DashboardService} from "../../../../shared/Apis/dashboard.service";
import {StateService} from "../../../../shared/services/state.service";
import {stage, step, stepId} from "../../../../shared/constant/stage";
import {MainService} from "../../../../shared/Apis/main.service";

@Component({
    selector: 'app-rtn-withliaisonagent',
    templateUrl: './rtn-withliaisonagent.component.html',
    styleUrls: ['./rtn-withliaisonagent.component.scss']
})
export class RTNWITHLIAISONAGENTComponent extends BaseComponent implements OnInit {
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
                public dashboardService: DashboardService) {
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
                'RTN_WTIHAGENT': [
                    {
                        type: 'dropdown',
                        key: 'rtnReasonMap',
                        options: this.state.returnReasones,
                        placeholder: 'سبب الراجع',
                        selected: null
                    }

                ],
                "ASSGN_AGENT": [
                    {
                        type: 'dropdown',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب التوصيل',
                        selected: null
                    }
                ],
                "ASSIGN_LIASIONAGT": [
                    {
                        type: 'dropdown',
                        options: [],
                        placeholder: 'مندوب الإرتباط',
                        selected: null
                    }
                ],
                "CHNGE_AGENT": [
                    {
                        type: 'dropdown',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب الإرتباط',
                        selected: null
                    }

                ],
                "RTN_TO_AGENT": [
                    {
                        type: 'dropdown',
                        key: 'rtnReasonMap',
                        options: this.state.returnReasones,
                        placeholder: 'سبب الراجع',
                        selected: null
                    }

                ],
                "POSTPONED": [
                    {
                        type: 'date',
                        key: 'postponedToMap',
                        selected: null
                    },
                    {
                        type: 'dropdown',
                        key: 'postponedOptionMap',
                        options: this.state.postponedResonse,
                        selected: null,
                        placeholder: 'سبب التأجيل',

                    },

                ],
                'RTN_TOSTORE': [
                    {
                        type: 'dropdown',
                        key: 'rtnReasonMap',
                        options: this.state.returnReasones,
                        selected: null,
                        placeholder: 'سبب الراجع',
                    }

                ],
                'PART_SUCC': [
                    {
                        type: 'input',
                        key: 'newReceiptsAmtIqdMap',
                        selected: null,
                        placeholder: 'مبلغ الوصل د.ع',
                    },
                    {
                        type: 'input',
                        key: 'newReceiptsAmtUsdMap',
                        selected: null,
                        placeholder: 'مبلغ الوصل$',
                    },
                    {
                        type: 'input',
                        key: 'partialQtyReturnMap',
                        selected: null,
                        placeholder: 'القطع الراجعة',
                    }
                ],
                'SUCS_DLV_CHANGEAMT': [
                    {
                        type: 'input',
                        key: 'newReceiptsAmtIqdMap',
                        selected: null,
                        placeholder: 'مبلغ الوصل د.ع',
                    },
                    {
                        type: 'input',
                        key: 'newReceiptsAmtUsdMap',
                        selected: null,
                        placeholder: 'مبلغ الوصل$',
                    },

                ]
            }
        })

        this.setFilters()
        this.setData()
        this.getData()
    }


    changeDecision(data: any, ev: any) {
        if (this.optionForAction[ev.value]) {
            data.optionForAction = JSON.parse(JSON.stringify(this.optionForAction[ev.value]));
        } else {
            data.optionForAction = null
        }
    }

    resetFilter() {
        this.setFilters()
        this.getData()
    }

    getData() {
        this.loading = true
        const filter = Object.keys(this.filters)
            .filter((key) => ['step', 'stage', 'cRcvDistrict', 'customerReceipt', 'c_createddt', 'qManifestId', 'merchantName', 'from', 'to', 'stateNameArabic', 'agentName', 'c_rcv_hp1', 'branchCode'].includes(key))
            .reduce((obj: any, key: any) => {
                return Object.assign(obj, {
                    [key]: this.filters[key]
                });
            }, {});
        this.dashboardService.getReturnedCases().subscribe((res: any) => {
            this.data = this.removeDuplicatesAndCountEntries(res)

            this.loading = false
        }, () => {
            this.loading = false
        })

    }

    selectedAgent: any
    casesLoading: any
    visible: any
    cases: any
    title=''
    openCases(data: any) {
        this.selectedAgent = data
        this.title = `راجع من فرع : السنبلة - النجف - منفيست الارجاع : `+data.agentId
        this.casesLoading = true
        let filter = {
            "step": this.step,
            "branchId":31,
            "liaisonAgentId": data.agentId,
        }
        this.cases=[]
        this.visible = true
        this.dashboardService.getReturnedWithliasionPopUp(data.agentId).subscribe(el => {
            this.cases = el
            if (this.cases.length == 0){
                this.visible = false
            }
            this.casesLoading = false
        })
    }
    RTN_RCVDFROMLIAISON(data:any){
        let ccid = data.caseId
        let base:any = {
            "casesIds": [ccid],
            "qrmk":{},
            "branchId":"31"
        }
        base.qrmk[ccid] = data.rmk
        this.casesLoading = true
        this.dashboardService.RTN_RCVDFROMLIAISON(base).subscribe(el=>{
            this.casesLoading = false
            this.openCases(this.selectedAgent)
            this.getData()
        })
    }
    removeDuplicatesAndCountEntries(array: any) {
        const agents: any = {};

        // Loop through the array and process each object
        array.forEach((obj: any) => {
            const liaisonAgentId = obj.rtnManifestId;

            if (liaisonAgentId in agents) {
                // If agentId already exists, increment the count and add caseId to the array
                agents[liaisonAgentId].count++;
                agents[liaisonAgentId].caseIds.push(obj.id);
            } else {
                // If agentId doesn't exist, create a new entry
                agents[liaisonAgentId] = {
                    count: 1,
                    caseIds: [obj.id],
                    agentData: {}
                };
            }

            // Copy all other data except agentId to the agentData object
            for (const key in obj) {
                if (key !== "rtnManifestId") {
                    agents[liaisonAgentId].agentData[key] = obj[key];
                }
            }
        });

        // Convert agents object back to an array
        const result = Object.keys(agents).map(liaisonAgentId => ({
            agentId: parseInt(liaisonAgentId),
            count: agents[liaisonAgentId].count,
            caseIds: agents[liaisonAgentId].caseIds,
            ...agents[liaisonAgentId].agentData
        }));

        return result;
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
        return this.RTN_WITHLIAISONAGENT();
    }

    RTN_WITHLIAISONAGENT() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: false,
            merchantName: false,
            from: false,
            to: false,
            stateNameArabic: false,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: true,
            qManifestId: false,
            cc_tobranch: true,
            cc_rtnmanifestid: true,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'مندوب ألأرتباط',
                type: 'string',
                key: ''
            },
            {
                name: 'قادمة من فرع',
                type: 'string',
                key: ''
            },
            {
                name: 'رقم المنفيست الارجاع',
                type: 'string',
                key: 'agentId'
            },
            {
                name: '',
                type: 'button',
                key: ''
            }
        ]

    }


}
