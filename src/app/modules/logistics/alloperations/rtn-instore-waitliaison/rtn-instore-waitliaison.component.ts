
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from "../../../../shared/base.component";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../../../shared/Apis/dashboard.service";
import { StateService } from "../../../../shared/services/state.service";
import { stage, step, stepId } from "../../../../shared/constant/stage";
import { MainService } from "../../../../shared/Apis/main.service";
import * as moment from 'moment';

@Component({
    selector: 'app-rtn-instore-waitliaison',
    templateUrl: './rtn-instore-waitliaison.component.html',
    styleUrls: ['./rtn-instore-waitliaison.component.scss']
})
export class RTNINSTOREWAITLIAISONComponent extends BaseComponent implements OnInit {
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
                'RTN_WTIHAGENT': [
                    {
                        type: 'dropdown',
                        key: 'rtnReasonMap',
                        options: this.state.returnReasones,
                        placeholder: 'سبب الراجع',
                        selected: null
                    }

                ],
                "ASSGN_AGENT":[
                    {
                        type: 'dropdown',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب التوصيل',
                        selected: null
                    }
                ],
                "ASSIGN_LIASIONAGT":[
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
    save() {
        let updatedCases = this.data.filter(el => el.decision)
        let casesIds = updatedCases.map(el => el.caseId)
        let actionsMap: any = {}

        updatedCases.forEach((obj: any) => {
            actionsMap[obj.caseId] = obj.decision;
        });
        let otherData: any = {
            "newReceiptsAmtIqdMap": {},
            "newReceiptsAmtUsdMap": {},
            "rtnReasonMap": {},
            "postponedOptionMap": {},
            "postponedToMap": {},
            "queueColsToUpdate": {},
            "partialQtyReturnMap": {},
            "casesToRmkMap": {},
        }

        updatedCases.forEach((obj: any) => {
            if (obj.optionForAction) {
                obj.optionForAction.forEach((opt: any) => {
                    if (opt.key == 'postponedToMap') {
                        otherData[opt.key][obj.caseId] = moment(opt.selected).format('yyyy-MM-DD')
                    } else {
                        otherData[opt.key][obj.caseId] = opt.selected
                    }
                });
            }
        });

        let base = {
            "stepCode": this.step,
            "stage":this.stage,
            "casesIds": casesIds,
            ...otherData,
            "actionsMap": actionsMap
        }
        this.loading = true
        this.dashboardService.updateCase(base).subscribe(res => {
            this.loading = false
            this.getData()
        }, () => {
            this.loading = false
        })
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
            .filter((key) => ['step', 'stage','cRcvDistrict', 'customerReceipt','c_createddt','qManifestId', 'merchantName', 'from', 'to', 'stateNameArabic', 'agentName', 'c_rcv_hp1', 'branchCode'].includes(key))
            .reduce((obj: any, key: any) => {
                return Object.assign(obj, {
                    [key]: this.filters[key]
                });
            }, {});
        this.dashboardService.INIT_NEWINSTORE(filter).subscribe((res: any) => {
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
        return this.RTN_INSTORE_WAITLIAISON();
    }
    RTN_INSTORE_WAITLIAISON() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: false,
            from: false,
            to: false,
            stateNameArabic: false,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: true,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'إلى فرع',
                type: 'string',
                key: ''
            },
            {
                name: 'رقم الوصل',
                type: 'string',
                key: 'cCustreceiptnoori'
            },
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
            },
            {
                name: 'مبلغ الوصل د.ع',
                type: 'string',
                key: 'cReceiptamt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'string',
                key: ''
            },
            {
                name: 'q_assigned_to',
                type: 'string',
                key: ''
            }
        ]

    }



}
