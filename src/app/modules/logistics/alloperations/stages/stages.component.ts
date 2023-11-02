import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from "../../../../shared/base.component";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../../../shared/Apis/dashboard.service";
import { StateService } from "../../../../shared/services/state.service";
import { stage, step, stepId } from "../../../../shared/constant/stage";
import { MainService } from "../../../../shared/Apis/main.service";
import * as moment from 'moment';
import {combineLatest, finalize, forkJoin} from "rxjs";

@Component({
    selector: 'app-stages',
    templateUrl: './stages.component.html',
    styleUrls: ['./stages.component.scss']
})
export class StagesComponent extends BaseComponent implements OnInit {
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
        this.stage = this.route.snapshot.paramMap.get('stage');
        this.step = this.route.snapshot.paramMap.get('step');

    }
    changeState(ev: any) {
        this.mainService.getAllDistritCodes(ev.value)
    }

    filterOperation(item:any){
        if (item.toAgent){
            return this.operation.filter((el:any)=>el.value =='ASSGN_AGENT')

        }
        if (item.toLiaisonAgent){
            return this.operation.filter((el:any)=>el.value =='ASSIGN_LIASIONAGT')
        }

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
        if (this.stage == 'INIT' && this.step == "NEWINSTORE"){
            let assignToAgent = this.data.filter(el => el.decision == 'ASSGN_AGENT')
            let assignToLiaisonAgent = this.data.filter(el => el.decision == 'ASSIGN_LIASIONAGT')
            let assignToAgentData:any = []
            let assignToLiaisonAgentData:any = []
            assignToAgent.forEach(el=>{
                assignToAgentData.push({
                    "deliveryAgent": el.optionForAction[0].selected,
                    "cId": el.caseId,
                    "note": el.note
                })
            })
            assignToLiaisonAgent.forEach(el=>{
                assignToLiaisonAgentData.push({
                    "liaisonAgentId": el.optionForAction[0].selected,
                    "cId": el.caseId,
                    "note": el.note
                })
            })
            let completionObservables = [];
            if (assignToAgent.length>0){
                completionObservables.push(this.dashboardService.assignToAgent(assignToAgentData).pipe(finalize(() => console.log('Subscription 1 completed.'))))
            }
            if (assignToLiaisonAgent.length>0){
                completionObservables.push(this.dashboardService.assignToLiaisonAgent(assignToLiaisonAgentData).pipe(finalize(() => console.log('Subscription 2 completed.'))))
            }

            this.loading = true
            const allCompleted$ = forkJoin(completionObservables);
            allCompleted$.subscribe(el=>{
                this.loading = false
                this.getData()
            },()=>{
                this.loading = false
            })
        }else{
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
    }
    changeDecision(data: any, ev: any) {
        if (ev.value =='ASSIGN_LIASIONAGT'){
            this.loading = true
            this.dashboardService.getLiaisonAgentFilter(data.comingFromBranch,data.rcvState).subscribe(el=>{
                this.loading = false
                data.optionForAction = JSON.parse(JSON.stringify(this.optionForAction[ev.value]));
                const array = Object.entries(el).map(([key, value]) => ({
                    value: value,
                    label: key
                }));
                data.optionForAction[0].options = array
            })

        }else{
            if (this.optionForAction[ev.value]) {
                data.optionForAction = JSON.parse(JSON.stringify(this.optionForAction[ev.value]));
            } else {
                data.optionForAction = null
            }
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
        if (this.stage == "INIT" && this.step == "NEWINSTORE"){
            this.dashboardService.INIT_NEWINSTORE(filter).subscribe((res: any) => {
                this.data = res
                this.loading = false
            },()=>{
                this.loading = false
            })
        }else{
            this.dashboardService.getCaseFilterd(filter).subscribe((res: any) => {
                this.data = res
                this.loading = false
            },()=>{
                this.loading = false
            })
        }

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
        switch (this.step) {
            case 'NEW_ONWAY':
                return this.NEW_ONWAY();
            case 'NEWINSTORE':
                return this.NEWINSTORE();
            case 'PRINTMANIFEST':
                return this.PRINTMANIFEST();
            case 'ONWAY':
                return this.ONWAY();
            case 'RTN_WITHAGENT':
                return this.RTN_WITHAGENT();
            case 'POSTPONED':
                return this.POSTPONED();
            case 'TRY_AGAIN':
                return this.TRY_AGAIN();
            case 'RTN_INSTORE':
                return this.RTN_INSTORE();
            // case 'RTNARCHV':
            //     return 'CNCL';
            case 'FORCE_DLV':
                return this.FORCE_DLV();
            case 'DLEIVERD':
                return this.DLEIVERD();
            case 'PART_SUCC':
                return this.PART_SUCC();
            case 'SUCC_CHANGEPRICE':
                return this.SUCC_CHANGEPRICE();
            case 'MANIFEST_BRANCHES':
                return this.MANIFEST_BRANCHES();
            case 'LIAISONAGT_NEWONWAY':
                return this.LIAISONAGT_NEWONWAY();
            case 'RTN_WITHLIAISONAGENT':
                return this.RTN_WITHLIAISONAGENT();
            case 'RTN_INSTORE_WAITLIAISON':
                return this.RTN_INSTORE_WAITLIAISON();
            case 'RTN_MANIFEST_LIAISON':
                return this.RTN_MANIFEST_LIAISON();
            case 'READYTOPRINT':
                return this.READYTOPRINT();
            case 'READYTOPICKUP':
                return this.READYTOPICKUP();
        }

    }

    NEW_ONWAY() {
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
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: true

        }
        this.columns = [
            {
                name: 'صاحب المحل',
                type: 'string',
                key: 'name'
            },
            {
                name: 'مبلغ الوصل',
                type: 'string',
                key: 'cReceiptamt'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'رقم العملية',
                type: 'id',
                key: ''
            },
            {
                name: 'اسم المستلم',
                type: 'string',
                key: 'rcvName'
            },
            {
                name: 'الهاتف',
                type: 'string',
                key: ''
            },
            {
                name: 'العدد',
                type: 'string',
                key: 'quantity'
            },
            {
                name: 'التاريخ',
                type: 'date',
                key: 'cCreateddt'
            }
        ]

    }

    NEWINSTORE() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: true,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        this.columns = [
            {
                name: 'رقم الوصل',
                type: 'string',
                key: 'cCustreceiptnoori'
            },
            {
                name: 'مبلغ الوصل د.ع',
                type: 'string',
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'أنشأ في فرع',
                type: 'string',
                key: 'branchName'
            },
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'ملاحظات',
                type: 'note',
                key: 'note'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'FilteredDropdown',
                key: ''
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            }
        ]

    }

    PRINTMANIFEST() {
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
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        this.columns = [
            {
                name: 'المندوب',
                type: 'string',
                key: 'agentName'
            },
            {
                name: 'عدد الشحنات',
                type: 'button',
                title: 'عرض جميع الشحنات - العدد 6',
                key: ''
            },
            {
                name: 'طباعة الكشف',
                type: 'button',
                title: 'PDF طباعة الكشف',
                key: ''
            },
            {
                name: '',
                type: 'button',
                title: 'استلام الشحنات باركود',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: 'string',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },

        ]

    }

    ONWAY() {
        this.filterDisplay = {
            c_dlvagent_manifestid: true,
            c_id: true,
            customerReceipt: true,
            merchantName: true,
            from: true,
            to: true,
            stateNameArabic: true,
            agentName: true,
            c_rcv_hp1: true,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'هاتف المستلم',
                type: 'string',
                key: ''
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'تاريخ الإعطاء للمندوب',
                type: 'date',
                key: 'postponedTo'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },
            {
                name: 'ملاحظات',
                type: 'note',
                key: 'note'
            },
            {
                name: 'اشعار المندوب',
                type: 'string',
                key: ''
            },
        ]

    }

    RTN_WITHAGENT() {
        this.filterDisplay = {
            c_dlvagent_manifestid: true,
            c_id: true,
            customerReceipt: true,
            merchantName: true,
            from: true,
            to: true,
            stateNameArabic: true,
            agentName: true,
            c_rcv_hp1: true,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'هاتف المستلم',
                type: 'string',
                key: ''
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'تاريخ الإعطاء للمندوب',
                type: 'date',
                key: 'postponedTo'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },
            {
                name: 'ملاحظات',
                type: 'note',
                key: 'note'
            },
            {
                name: 'سبب الأرجاع',
                type: 'string',
                key: 'returnReason'
            },
        ]

    }

    POSTPONED() {
        this.filterDisplay = {
            c_dlvagent_manifestid: true,
            c_id: true,
            customerReceipt: true,
            merchantName: true,
            from: true,
            to: true,
            stateNameArabic: true,
            agentName: true,
            c_rcv_hp1: true,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'هاتف المستلم',
                type: 'string',
                key: ''
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'تاريخ الإعطاء للمندوب',
                type: 'date',
                key: 'postponedTo'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },
            {
                name: 'ملاحظات',
                type: 'note',
                key: 'note'
            },
            {
                name: 'مؤجل إلى',
                type: 'date',
                key: ''
            },
            {
                name: 'سبب التأجيل',
                type: 'string',
                key: ''
            },
        ]

    }

    TRY_AGAIN() {
        this.filterDisplay = {
            c_dlvagent_manifestid: true,
            c_id: true,
            customerReceipt: true,
            merchantName: true,
            from: true,
            to: true,
            stateNameArabic: true,
            agentName: true,
            c_rcv_hp1: true,
            c_createddt: false,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }
        //no table is shown
        this.columns = []

    }

    RTN_INSTORE() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    FORCE_DLV() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    DLEIVERD() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    PART_SUCC() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    SUCC_CHANGEPRICE() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    MANIFEST_BRANCHES() {
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
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'الى فرع',
                type: 'string',
                key: ''
            },
            {
                name: 'المندوب',
                type: 'string',
                key: ''
            },
            {
                name: 'عدد الشحنات',
                type: 'string',
                key: 'quantity'
            },
            {
                name: 'طباعة المنفيست',
                type: '',
                key: ''
            },
            {
                name: '',
                type: '',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: '',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    LIAISONAGT_NEWONWAY() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: false,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: false,
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
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },
            {
                name: 'المنطقة',
                type: 'string',
                key: ''
            },
            {
                name: 'مندوب التوصيل',
                option: this.state.deliveryAgents,
                type: 'string',
                key: ''
            },
        ]

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
                key: ''
            }
        ]

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

    RTN_MANIFEST_LIAISON() {
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
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'إلى فرع',
                type: 'string',
                key: ''
            },
            {
                name: 'المندوب',
                type: 'string',
                key: ''
            },
            {
                name: 'عدد الشحنات',
                type: 'string',
                key: 'name'
            },
            {
                name: '',
                type: 'string',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: 'string',
                key: 'cReceiptamt'
            },
            {
                name: 'طباعة المنفيست',
                type: 'string',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'string',
                key: ''
            }
        ]

    }

    READYTOPRINT() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }

    READYTOPICKUP() {
        this.filterDisplay = {
            c_dlvagent_manifestid: false,
            c_id: false,
            customerReceipt: true,
            merchantName: true,
            from: false,
            to: false,
            stateNameArabic: true,
            agentName: false,
            c_rcv_hp1: false,
            c_createddt: true,
            cRcvDistrict: false,
            cc_liaisonagentid: false,
            qManifestId: false,
            cc_tobranch: false,
            cc_rtnmanifestid: false,
            cc_frombranch: false,
            barcode_checker: false

        }

        this.columns = [
            {
                name: 'المتجر',
                type: 'string',
                key: 'name'
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
                key: 'cReceiptamt'
            },
            {
                name: 'مبلغ الوصل $',
                type: 'string',
                key: 'cReceiptamtUsd'
            },
            {
                name: 'العنوان',
                type: 'string',
                key: 'address'
            },
            {
                name: 'تاريخ الشحنه',
                type: 'date',
                key: 'cCreateddt'
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
